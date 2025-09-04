import pymysql
from pymysql.cursors import DictCursor
from typing import Optional, Tuple, List, Dict, Any
from src.config import db_config
from datetime import datetime


def _conn():
    return pymysql.connect(**db_config)

def usuario_existe(autor_id: int) -> bool:
    conn = _conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM usuarios WHERE id=%s", (autor_id,))
            return cur.fetchone() is not None
    finally:
        conn.close()
def cadastrar_usuarios(nome: str, email: str, senha: str, dt_criacao) -> None:
    conn = pymysql.connect(**db_config)
    try:
        with conn.cursor() as cursor:
            query = """
                INSERT INTO usuarios (nome, email, senha, dt_criacao)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (nome, email, senha, dt_criacao))
        conn.commit()  # IMPORTANTE!
    finally:
        conn.close()

def buscar_usuario_por_email(email: str):
    conn = pymysql.connect(**db_config)
    try:
        with conn.cursor(DictCursor) as cursor:
            cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
            return cursor.fetchone()
    finally:
        conn.close()

# ---------- CREATE ----------
def inserir_post(titulo: str, texto: str, dt_criacao: datetime, autor_id: int, caminho_foto: Optional[str]) -> int:
    conn = _conn()
    try:
        with conn.cursor() as cur:
            sql = """
                INSERT INTO posts_blog (titulo, texto, dt_criacao, autor_id, caminho_foto)
                VALUES (%s, %s, %s, %s, %s)
            """
            cur.execute(sql, (titulo, texto, dt_criacao, autor_id, caminho_foto))
        conn.commit()
        return cur.lastrowid  # type: ignore
    finally:
        conn.close()

# ---------- READ (one) ----------
def obter_post(post_id: int) -> Optional[Dict[str, Any]]:
    conn = _conn()
    try:
        with conn.cursor(DictCursor) as cur:
            sql = """
                SELECT b.id, b.titulo, b.texto, b.dt_criacao, b.autor_id,
                       u.nome AS autor_nome, b.caminho_foto
                FROM posts_blog b
                LEFT JOIN usuarios u ON u.id = b.autor_id
                WHERE b.id = %s
            """
            cur.execute(sql, (post_id,))
            return cur.fetchone()
    finally:
        conn.close()

# ---------- READ (list + filtros/paginação) ----------
def listar_posts(page: int = 1, page_size: int = 10,
                 autor_id: Optional[int] = None,
                 q: Optional[str] = None) -> Dict[str, Any]:
    offset = (page - 1) * page_size
    params: List[Any] = []
    where = []

    if autor_id:
        where.append("b.autor_id = %s")
        params.append(autor_id)
    if q:
        where.append("(b.titulo LIKE %s OR b.texto LIKE %s)")
        like = f"%{q}%"
        params.extend([like, like])

    where_sql = ("WHERE " + " AND ".join(where)) if where else ""

    conn = _conn()
    try:
        with conn.cursor(DictCursor) as cur:
            # total
            cur.execute(f"SELECT COUNT(*) AS total FROM posts_blog b {where_sql}", params)
            total = cur.fetchone()["total"]  # type: ignore

            # page
            cur.execute(f"""
                SELECT b.id, b.titulo, b.texto, b.dt_criacao, b.autor_id,
                       u.nome AS autor_nome, b.caminho_foto
                FROM posts_blog b
                LEFT JOIN usuarios u ON u.id = b.autor_id
                {where_sql}
                ORDER BY b.dt_criacao DESC, b.id DESC
                LIMIT %s OFFSET %s
            """, params + [page_size, offset])
            rows = cur.fetchall()

        return {"items": rows, "page": page, "page_size": page_size, "total": total}
    finally:
        conn.close()

# ---------- UPDATE ----------
def atualizar_post(post_id: int, titulo: Optional[str] = None,
                   texto: Optional[str] = None,
                   caminho_foto: Optional[str] = None) -> bool:
    sets = []
    params: List[Any] = []
    if titulo is not None:
        sets.append("titulo = %s"); params.append(titulo)
    if texto is not None:
        sets.append("texto = %s"); params.append(texto)
    if caminho_foto is not None:
        sets.append("caminho_foto = %s"); params.append(caminho_foto)

    if not sets:
        return False  # nada a atualizar

    params.append(post_id)
    conn = _conn()
    try:
        with conn.cursor() as cur:
            cur.execute(f"UPDATE posts_blog SET {', '.join(sets)} WHERE id = %s", params)
        conn.commit()
        return cur.rowcount > 0  # type: ignore
    finally:
        conn.close()

# ---------- DELETE ----------
def deletar_post(post_id: int) -> bool:
    conn = _conn()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM posts_blog WHERE id=%s", (post_id,))
        conn.commit()
        return cur.rowcount > 0  # type: ignore
    finally:
        conn.close()


def atualizar_foto_post(post_id: int, caminho_foto: str) -> bool:
    conn = _conn()
    try:
        with conn.cursor() as cur:
            cur.execute("UPDATE posts_blog SET caminho_foto=%s WHERE id=%s", (caminho_foto, post_id))
            print("[DB] atualizar_foto_post rowcount=", cur.rowcount, " post_id=", post_id)
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()

def existe_post(post_id: int) -> bool:
    conn = _conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM posts_blog WHERE id=%s", (post_id,))
            return cur.fetchone() is not None
    finally:
        conn.close()
