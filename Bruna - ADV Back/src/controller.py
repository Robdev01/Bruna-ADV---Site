from datetime import datetime
from typing import Optional
import os
from flask import current_app, jsonify, url_for, request, send_file, redirect
import re
from src.models import (
    cadastrar_usuarios, buscar_usuario_por_email, deletar_post, atualizar_post,
    listar_posts, obter_post, inserir_post, usuario_existe, atualizar_foto_post, existe_post
)

# >>> serviço de imagens
from services.image_service import save_image, delete_static_file, guess_mimetype
from services.email_service import send_newsletter_signup, send_contact_message

# -------------------------
# Auth / Usuários
# -------------------------
def login(data):
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    usuario = buscar_usuario_por_email(email)
    if not usuario:
        return jsonify({"error": "Usuário não encontrado"}), 404

    if usuario["senha"] != senha:  # Dica: trocar para hash futuramente
        return jsonify({"error": "Senha incorreta"}), 403

    return jsonify({
        "message": "Login realizado com sucesso",
        "usuario": {"id": usuario["id"], "email": usuario["email"], "nome": usuario["nome"]},
    }), 200


def cadastrar_usuario(data):
    email = data.get("email")
    nome = data.get("nome")
    senha = data.get("senha")
    dt_criacao_raw = data.get("dt_criacao")

    if not email or not nome or not senha:
        return jsonify({"error": "Email, nome e senha são obrigatórios"}), 400

    # evita duplicidade
    if buscar_usuario_por_email(email):
        return jsonify({"error": "Email já cadastrado"}), 409

    # trata dt_criacao
    if isinstance(dt_criacao_raw, str) and dt_criacao_raw.strip():
        try:
            dt_criacao = datetime.strptime(dt_criacao_raw, "%d/%m/%Y %H:%M:%S")
        except ValueError:
            return jsonify({"error": "Formato de dt_criacao inválido. Use DD/MM/YYYY HH:MM:SS"}), 400
    else:
        dt_criacao = datetime.utcnow()

    try:
        cadastrar_usuarios(nome, email, senha, dt_criacao)
        return jsonify({"message": "Usuário cadastrado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# BLOG: CRUD
# -------------------------
def criar_post_controller(data):
    titulo = (data.get("titulo") or "").strip()
    texto = (data.get("texto") or "").strip()
    autor_id = data.get("autor_id")
    caminho_foto: Optional[str] = data.get("caminho_foto")
    dt_raw = data.get("dt_criacao")

    if not titulo or not texto or not autor_id:
        return jsonify({"error": "titulo, texto e autor_id são obrigatórios"}), 400

    if not usuario_existe(int(autor_id)):
        return jsonify({"error": "autor_id inexistente em usuarios"}), 400

    # Trata dt_criacao
    if isinstance(dt_raw, str) and dt_raw.strip():
        try:
            dt_criacao = datetime.strptime(dt_raw, "%d/%m/%Y %H:%M:%S")
        except ValueError:
            return jsonify({"error": "dt_criacao inválido. Use DD/MM/YYYY HH:MM:SS"}), 400
    else:
        dt_criacao = datetime.utcnow()

    try:
        post_id = inserir_post(titulo, texto, dt_criacao, int(autor_id), caminho_foto)
        return jsonify({"message": "Post criado com sucesso", "id": post_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def obter_post_controller(post_id: int):
    post = obter_post(post_id)
    if not post:
        return jsonify({"error": "Post não encontrado"}), 404
    return jsonify(post), 200


def listar_posts_controller():
    # query params: page, page_size, q, autor_id
    try:
        page = int(request.args.get("page", 1))
        page_size = int(request.args.get("page_size", 10))
    except ValueError:
        return jsonify({"error": "page e page_size devem ser inteiros"}), 400

    q = request.args.get("q")
    autor_id = request.args.get("autor_id", type=int)

    resultado = listar_posts(page=page, page_size=page_size, autor_id=autor_id, q=q)
    return jsonify(resultado), 200


def atualizar_post_controller(post_id: int, data):
    # campos opcionais
    titulo = data.get("titulo")
    texto = data.get("texto")
    caminho_foto = data.get("caminho_foto")

    if titulo is None and texto is None and caminho_foto is None:
        return jsonify({"error": "Nenhum campo para atualizar"}), 400

    ok = atualizar_post(post_id, titulo=titulo, texto=texto, caminho_foto=caminho_foto)
    if not ok:
        return jsonify({"error": "Post não encontrado ou nada atualizado"}), 404
    return jsonify({"message": "Post atualizado com sucesso"}), 200


def deletar_post_controller(post_id: int):
    ok = deletar_post(post_id)
    if not ok:
        return jsonify({"error": "Post não encontrado"}), 404
    return jsonify({"message": "Post deletado com sucesso"}), 200


# -------------------------
# Upload/Download de Foto (usa image_service)
# -------------------------
EXTS = {"png", "jpg", "jpeg", "gif", "webp"}

def upload_foto_post_controller(post_id, file_storage):
    if not existe_post(post_id):
        return jsonify({"error": "Post não encontrado"}), 404
    if not file_storage:
        return jsonify({"error": "Envie a foto em multipart/form-data com a chave 'foto'"}), 400

    try:
        url_relativa, rel_path, fs_path = save_image(
            file_storage=file_storage,
            static_folder=current_app.static_folder,
            upload_subdir="uploads/blog",
        )
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Falha ao salvar arquivo: {e}"}), 500

    # grava no banco; se falhar, remove o arquivo salvo (rollback)
    if not atualizar_foto_post(post_id, url_relativa):
        delete_static_file(current_app.static_folder, rel_path)
        return jsonify({"error": "Falha ao salvar no banco"}), 500

    url_publica = url_for("static", filename=rel_path, _external=True)
    return jsonify({
        "message": "Upload concluído",
        "post_id": post_id,
        "url": url_publica,
        "caminho_banco": url_relativa
    }), 201


def get_foto_post_controller(post_id: int):
    post = obter_post(post_id)
    if not post:
        return jsonify({"error": "Post não encontrado"}), 404

    caminho = (post.get("caminho_foto") or "").strip()
    if not caminho:
        return jsonify({"error": "Post não possui foto"}), 404

    # normaliza para 'uploads/...'
    rel = caminho[len("/static/"):] if caminho.startswith("/static/") else caminho.lstrip("/")
    fs_path = os.path.join(current_app.static_folder, rel)

    if not os.path.isfile(fs_path):
        return jsonify({"error": "Arquivo não encontrado no servidor"}), 404

    # opcional: redirecionar para URL pública
    if request.args.get("redirect") == "1":
        return redirect(url_for("static", filename=rel.replace("\\", "/")))

    return send_file(
        fs_path,
        mimetype=guess_mimetype(fs_path),
        as_attachment=(request.args.get("download") == "1"),
    )


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

def newsletter_subscribe_controller(data):
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    accept = bool(data.get("accept"))

    if not email or not EMAIL_RE.match(email):
        return jsonify({"error": "E-mail inválido"}), 400
    if not accept:
        return jsonify({"error": "É necessário aceitar o recebimento de e-mails"}), 400

    try:
        send_newsletter_signup(email, name)
        return jsonify({"message": "Inscrição registrada. Obrigado!"}), 200
    except Exception as e:
        return jsonify({"error": f"Falha ao enviar notificação: {e}"}), 500

def contact_send_controller(data):
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    message = (data.get("message") or "").strip()

    if not (name and email and message):
        return jsonify({"error": "Preencha nome, e-mail e mensagem"}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"error": "E-mail inválido"}), 400

    try:
        send_contact_message(name, email, phone, message)
        return jsonify({"message": "Mensagem enviada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": f"Falha ao enviar notificação: {e}"}), 500