# main.py
from flask import Flask
from flask_cors import CORS
from src.routes import routes
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

app = Flask(__name__, static_folder="static")

# Limites de upload (opcional, mas bom ter)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10MB

# Cria a pasta de uploads DENTRO do static do app
UPLOAD_SUBDIR = os.path.join(app.static_folder, "uploads", "blog")
os.makedirs(UPLOAD_SUBDIR, exist_ok=True)

# CORS + rotas
CORS(app)  # libere conforme sua necessidade
app.register_blueprint(routes, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5003)
