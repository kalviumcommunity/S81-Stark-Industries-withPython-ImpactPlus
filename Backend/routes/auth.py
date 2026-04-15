from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.auth_service import create_user, find_user_by_email, verify_password

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "NGO Staff")

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required."}), 400

    existing_user = find_user_by_email(email)
    if existing_user:
        return jsonify({"error": "Email already registered."}), 409

    user = create_user(name, email, password, role)
    access_token = create_access_token(
        identity=user["email"],
        additional_claims={"role": user["role"], "name": user["name"]},
    )

    return jsonify({"user": {"name": user["name"], "email": user["email"], "role": user["role"]}, "access_token": access_token}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    user = find_user_by_email(email)
    if not user or not verify_password(password, user["password"]):
        return jsonify({"error": "Invalid email or password."}), 401

    access_token = create_access_token(
        identity=user["email"],
        additional_claims={"role": user["role"], "name": user["name"]},
    )
    return jsonify({"user": {"name": user["name"], "email": user["email"], "role": user["role"]}, "access_token": access_token}), 200
