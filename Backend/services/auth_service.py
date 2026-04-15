from passlib.hash import pbkdf2_sha256
from bson.objectid import ObjectId
from db import users_collection


def hash_password(password: str) -> str:
    return pbkdf2_sha256.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pbkdf2_sha256.verify(password, hashed)


def find_user_by_email(email: str):
    return users_collection.find_one({"email": email.lower()})


def create_user(name: str, email: str, password: str, role: str):
    user = {
        "name": name.strip(),
        "email": email.strip().lower(),
        "password": hash_password(password),
        "role": role if role in ["Admin", "NGO Staff"] else "NGO Staff",
    }
    result = users_collection.insert_one(user)
    user["_id"] = str(result.inserted_id)
    user.pop("password")
    return user
