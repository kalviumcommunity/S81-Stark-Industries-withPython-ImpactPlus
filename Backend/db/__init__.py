from pymongo import MongoClient
from config import MONGODB_URI

client = MongoClient(MONGODB_URI)
db = client.get_default_database()
if db is None:
    db = client["ngo_impact"]

users_collection = db["users"]
programs_collection = db["programs"]
surveys_collection = db["surveys"]
