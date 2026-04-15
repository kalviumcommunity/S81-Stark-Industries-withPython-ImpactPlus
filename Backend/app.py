from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import JWT_SECRET_KEY
from db import db
from routes.auth import auth_bp
from routes.programs import programs_bp
from routes.analytics import analytics_bp
from routes.surveys import surveys_bp


def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    app.config["JSON_SORT_KEYS"] = False
    app.config["CORS_HEADERS"] = "Content-Type"
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)
    JWTManager(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(programs_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(surveys_bp)

    db.users.create_index("email", unique=True)
    db.programs.create_index("created_at")
    db.surveys.create_index("created_at")

    @app.route("/health")
    def health_check():
        return {"status": "ok", "service": "NGO Impact Optimizer Backend"}

    return app


if __name__ == "__main__":
    create_app().run(host="0.0.0.0", port=5000, debug=True)
