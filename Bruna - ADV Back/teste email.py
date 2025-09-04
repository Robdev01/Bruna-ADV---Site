

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configurações do servidor SMTP
smtp_host = "smtp.titan.email"  # Substitua pelo seu servidor SMTP
smtp_port = 465   # Porta para conexão sem SSL
email_usuario = "contato@brunacalheira.adv.br"  # Seu e-mail completo
email_senha = "Bruna@1410"  # Senha do e-mail

# Configuração da mensagem
remetente = email_usuario
destinatario = "contato@brunacalheira.adv.br"  # E-mail do destinatário
assunto = "Teste de Conexão SMTP"
corpo = "Este é um teste de envio de e-mail usando SMTP com Python."

# Criando a mensagem
mensagem = MIMEMultipart()
mensagem["From"] = remetente
mensagem["To"] = destinatario
mensagem["Subject"] = assunto
mensagem.attach(MIMEText(corpo, "plain"))

try:
    servidor = smtplib.SMTP(smtp_host, smtp_port)
    servidor.starttls()  # Inicia conexão segura
    servidor.login(email_usuario, email_senha)  # Login
    servidor.sendmail(remetente, destinatario, mensagem.as_string())  # Envia e-mail
    print("E-mail enviado com sucesso!")
except Exception as e:
    print(f"Erro ao enviar e-mail: {e}")
finally:
    servidor.quit()  # Encerra conexão
#Se quiser, posso ajudar a montar um exemplo específico para SMTP com SSL e Titan. Quer que eu faça isso, Robson?




