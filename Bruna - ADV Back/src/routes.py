from flask import Blueprint, request

from src.controller import cadastrar_usuario, login, criar_post_controller, listar_posts_controller, \
    obter_post_controller, atualizar_post_controller, deletar_post_controller, upload_foto_post_controller, \
    get_foto_post_controller, newsletter_subscribe_controller, contact_send_controller

routes = Blueprint('routes', __name__)

@routes.route('/register-usuarios', methods=['POST'])
def rota_inserir_usuario():
    return cadastrar_usuario(request.json)

@routes.route('/login', methods=['POST'])
def rota_login():
    return login(request.json)

# --- BLOG ---
@routes.post("/blog/posts")
def criar_post_route():
    return criar_post_controller(request.get_json(silent=True) or {})

@routes.get("/blog/posts")
def listar_posts_route():
    return listar_posts_controller()

@routes.get("/blog/posts/<int:post_id>")
def obter_post_route(post_id: int):
    return obter_post_controller(post_id)

@routes.put("/blog/posts/<int:post_id>")
def atualizar_post_route(post_id: int):
    return atualizar_post_controller(post_id, request.get_json(silent=True) or {})

@routes.delete("/blog/posts/<int:post_id>")
def deletar_post_route(post_id: int):
    return deletar_post_controller(post_id)

@routes.post("/blog/posts/<int:post_id>/foto")
def upload_foto_post(post_id: int):
    return upload_foto_post_controller(post_id, request.files.get("foto"))

@routes.get("/blog/posts/<int:post_id>/foto")
def get_foto_post(post_id: int):
    return get_foto_post_controller(post_id)

@routes.post("/newsletter/subscribe")
def newsletter_subscribe():
    data = request.get_json(silent=True) or {}
    return newsletter_subscribe_controller(data)

@routes.post("/contact")
def contact_send():
    data = request.get_json(silent=True) or {}
    return contact_send_controller(data)

@routes.get("/debug/mail-sanitized")
def debug_mail_sanitized():
    import os
    pw = os.getenv("SMTP_PASS", "")
    return {
        "SMTP_HOST": os.getenv("SMTP_HOST"),
        "SMTP_PORT": os.getenv("SMTP_PORT"),
        "SMTP_USE_SSL": os.getenv("SMTP_USE_SSL"),
        "SMTP_USER": os.getenv("SMTP_USER"),
        "MAIL_FROM": os.getenv("MAIL_FROM"),
        "PASS_len": len(pw),               # não mostra a senha, só o tamanho
        "PASS_endswith_space": pw.endswith(" ")
    }, 200

@routes.get("/debug/smtp-login")
def debug_smtp_login():
    # NÃO deixe em produção; use só pra testar
    import os, smtplib, ssl
    host = os.getenv("SMTP_HOST"); port = int(os.getenv("SMTP_PORT","465"))
    user = os.getenv("SMTP_USER"); pwd = os.getenv("SMTP_PASS")
    try:
        with smtplib.SMTP_SSL(host, port, context=ssl.create_default_context(), timeout=20) as s:
            s.ehlo(); s.login(user, pwd)
        return {"ok": True}, 200
    except Exception as e:
        return {"ok": False, "error": repr(e)}, 500