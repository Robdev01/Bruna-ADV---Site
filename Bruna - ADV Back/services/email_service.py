# services/email_service.py  (substitua tudo)
import smtplib, ssl
from email.message import EmailMessage
from email.utils import parseaddr, formataddr
from typing import Optional, Iterable

# ======== CREDENCIAIS FIXAS (EDITE AQUI) ========
SMTP_HOST = "smtp.titan.email"                      # host correto da Titan
SMTP_PORT = 465                                     # 465 = SSL
SMTP_USER = "contato@brunacalheira.adv.br"          # e-mail da caixa
SMTP_PASS = "Bruna@1410"             # <<< TROQUE AQUI
SMTP_USE_SSL = False                                 # SSL ligado

MAIL_FROM = "contato@brunacalheira.adv.br"   # remetente
MAIL_TO_NEWSLETTER = ["contato@brunacalheira.adv.br"]         # destino newsletter
MAIL_TO_CONTACT    = ["contato@brunacalheira.adv.br"]         # destino contato
# ================================================

def _ensure_ready():
    missing = [k for k, v in [
        ("SMTP_HOST", SMTP_HOST),
        ("SMTP_USER", SMTP_USER),
        ("SMTP_PASS", SMTP_PASS),
    ] if not v]
    if missing:
        raise RuntimeError(f"Config SMTP ausente: {', '.join(missing)}")

def _send(msg: EmailMessage, timeout: int = 25):
    print(f"[SMTP] host={SMTP_HOST!r} port={SMTP_PORT} ssl={SMTP_USE_SSL}")
    if SMTP_USE_SSL or SMTP_PORT == 465:
        ctx = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ctx, timeout=timeout) as s:
            s.ehlo()
            s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)
    else:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=timeout) as s:
            s.ehlo()
            s.starttls(context=ssl.create_default_context())
            s.ehlo()
            s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)

def _normalize_recipients(to: str | Iterable[str]) -> list[str]:
    if isinstance(to, str):
        return [a.strip() for a in to.split(",") if a.strip()]
    return [a for a in to if a]

def send_email(subject: str, html: str, text: str, to: str | Iterable[str],
               reply_to: Optional[str] = None):
    _ensure_ready()

    recipients = _normalize_recipients(to)
    if not recipients:
        raise ValueError("Nenhum destinatário informado")

    # normaliza From/Reply-To
    name, addr = parseaddr(MAIL_FROM)
    mail_from = formataddr((name or "", addr or SMTP_USER))

    msg = EmailMessage()
    msg["Subject"] = (subject or "").replace("\r", "").replace("\n", "")
    msg["From"] = mail_from
    msg["To"] = ", ".join(recipients)
    if reply_to:
        _, raddr = parseaddr(reply_to)
        if raddr:
            msg["Reply-To"] = raddr

    msg.set_content(text or "")
    msg.add_alternative(html or text or "", subtype="html")

    _send(msg)

def send_newsletter_signup(user_email: str, name: str = ""):
    subject = "Novo inscrito na Newsletter"
    text = f"Novo inscrito:\nEmail: {user_email}\nNome: {name or '-'}"
    html = f"""
    <h2>Novo inscrito na Newsletter</h2>
    <p><b>Email:</b> {user_email}</p>
    <p><b>Nome:</b> {name or '-'}</p>
    """
    send_email(subject, html, text, MAIL_TO_NEWSLETTER, reply_to=user_email)

def send_contact_message(name: str, email: str, phone: str, message: str):
    subject = "Novo contato pelo site"
    text = f"Nome: {name}\nEmail: {email}\nTelefone: {phone}\n\nMensagem:\n{message}"
    html = f"""
    <h2>Novo contato pelo site</h2>
    <p><b>Nome:</b> {name}</p>
    <p><b>Email:</b> {email}</p>
    <p><b>Telefone:</b> {phone}</p>
    <pre style="white-space:pre-wrap;font-family:inherit">{message}</pre>
    """
    send_email(subject, html, text, MAIL_TO_CONTACT, reply_to=email)
