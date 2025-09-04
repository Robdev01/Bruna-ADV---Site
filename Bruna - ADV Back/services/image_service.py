# services/image_service.py
from __future__ import annotations
import os, mimetypes
from uuid import uuid4
from typing import Iterable, Tuple, Optional
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from PIL import Image, UnidentifiedImageError

DEFAULT_EXTS = {"png", "jpg", "jpeg", "gif", "webp"}

def _is_real_image_stream(file_storage: FileStorage) -> bool:
    """Valida se o conteúdo é realmente uma imagem, direto do stream."""
    try:
        pos = file_storage.stream.tell()
        Image.open(file_storage.stream).verify()
        file_storage.stream.seek(pos)
        return True
    except (UnidentifiedImageError, OSError):
        try:
            file_storage.stream.seek(pos)
        except Exception:
            pass
        return False

def validate_upload(file_storage: FileStorage,
                    allowed_exts: Optional[Iterable[str]] = None) -> Tuple[str, str]:
    """
    Retorna (nome_seguro, ext) se válido; lança ValueError se inválido.
    """
    if not file_storage:
        raise ValueError("Nenhum arquivo enviado")

    nome = secure_filename(file_storage.filename or "")
    if not nome or "." not in nome:
        raise ValueError("Arquivo inválido")

    ext = nome.rsplit(".", 1)[1].lower()
    allowed = set(allowed_exts or DEFAULT_EXTS)
    if ext not in allowed:
        raise ValueError(f"Extensão não permitida ({ext}). Use: {', '.join(sorted(allowed))}")

    if not _is_real_image_stream(file_storage):
        raise ValueError("Arquivo enviado não é uma imagem válida")

    return nome, ext

def save_image(file_storage: FileStorage,
               static_folder: str,
               upload_subdir: str = "uploads/blog",
               allowed_exts: Optional[Iterable[str]] = None) -> Tuple[str, str, str]:
    """
    Salva a imagem no disco.

    Args:
        file_storage: FileStorage do Flask.
        static_folder: pasta raiz do /static (ex: current_app.static_folder).
        upload_subdir: subpasta dentro de static (ex: 'uploads/blog').
        allowed_exts: extensões aceitas.

    Returns:
        (url_relativa, rel_path, fs_path)
        - url_relativa: '/static/uploads/blog/arquivo.jpg' (para gravar no BD)
        - rel_path: 'uploads/blog/arquivo.jpg' (para url_for/static)
        - fs_path: caminho absoluto no filesystem
    """
    _, ext = validate_upload(file_storage, allowed_exts)

    novo_nome = f"{uuid4().hex}.{ext}"
    pasta = os.path.join(static_folder, upload_subdir)
    os.makedirs(pasta, exist_ok=True)

    fs_path = os.path.join(pasta, novo_nome)
    file_storage.save(fs_path)

    rel_path = os.path.join(upload_subdir, novo_nome).replace("\\", "/")
    url_relativa = f"/static/{rel_path}"
    return url_relativa, rel_path, fs_path

def delete_static_file(static_folder: str, path_like: str) -> bool:
    """
    Remove um arquivo salvo em /static. Aceita:
      - '/static/uploads/x.jpg'
      - 'uploads/x.jpg'
    Retorna True se removeu, False se não existia.
    """
    if not path_like:
        return False

    rel = path_like
    if rel.startswith("/static/"):
        rel = rel[len("/static/"):]
    rel = rel.lstrip("/")

    fs_path = os.path.join(static_folder, rel)
    if os.path.isfile(fs_path):
        try:
            os.remove(fs_path)
            return True
        except OSError:
            return False
    return False

def guess_mimetype(fs_path: str) -> str:
    mimetype, _ = mimetypes.guess_type(fs_path)
    return mimetype or "application/octet-stream"
