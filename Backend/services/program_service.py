from datetime import datetime
from bson.objectid import ObjectId
from db import programs_collection


CATEGORIES = ["Health", "Education", "Food", "Shelter", "Environment", "Livelihood"]
REGIONS = ["North", "South", "East", "West", "Central"]


def parse_number(value, field_name):
    if value is None or value == "":
        raise ValueError(f"{field_name} is required")
    try:
        return float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{field_name} must be a number")


def normalize_text(value):
    return str(value).strip().title()


def compute_program_metrics(program_data):
    cost = parse_number(program_data.get("cost"), "cost")
    beneficiaries = parse_number(program_data.get("beneficiaries"), "beneficiaries")
    before_metric = parse_number(program_data.get("before_metric"), "before_metric")
    after_metric = parse_number(program_data.get("after_metric"), "after_metric")

    if beneficiaries <= 0:
        raise ValueError("beneficiaries must be greater than 0")
    if cost <= 0:
        raise ValueError("cost must be greater than 0")

    cost_per_beneficiary = cost / beneficiaries
    impact_score = (after_metric - before_metric) / cost

    return {
        "cost": cost,
        "beneficiaries": int(beneficiaries),
        "before_metric": before_metric,
        "after_metric": after_metric,
        "cost_per_beneficiary": round(cost_per_beneficiary, 4),
        "impact_score": round(impact_score, 4),
    }


def create_program(payload):
    cleaned = {
        "name": normalize_text(payload.get("name")),
        "category": normalize_text(payload.get("category")) if payload.get("category") else "General",
        "region": normalize_text(payload.get("region")) if payload.get("region") else "Unknown",
    }
    cleaned.update(compute_program_metrics(payload))
    cleaned["created_at"] = datetime.utcnow().isoformat()
    result = programs_collection.insert_one(cleaned)
    cleaned["_id"] = str(result.inserted_id)
    return cleaned


def update_program(program_id, payload):
    if not ObjectId.is_valid(program_id):
        raise ValueError("Invalid program ID")
    cleaned = {
        "name": normalize_text(payload.get("name")),
        "category": normalize_text(payload.get("category")) if payload.get("category") else "General",
        "region": normalize_text(payload.get("region")) if payload.get("region") else "Unknown",
    }
    cleaned.update(compute_program_metrics(payload))
    cleaned["updated_at"] = datetime.utcnow().isoformat()
    result = programs_collection.update_one(
        {"_id": ObjectId(program_id)},
        {"$set": cleaned},
    )
    if result.matched_count == 0:
        return None
    cleaned["_id"] = program_id
    return cleaned


def get_programs(filters=None):
    query = {}
    if filters:
        if filters.get("category"):
            query["category"] = normalize_text(filters["category"])
        if filters.get("region"):
            query["region"] = normalize_text(filters["region"])
    return [serialize_program(item) for item in programs_collection.find(query).sort("created_at", -1)]


def get_program_by_id(program_id):
    if not ObjectId.is_valid(program_id):
        return None
    program = programs_collection.find_one({"_id": ObjectId(program_id)})
    return serialize_program(program) if program else None


def delete_program(program_id):
    if not ObjectId.is_valid(program_id):
        return False
    result = programs_collection.delete_one({"_id": ObjectId(program_id)})
    return result.deleted_count > 0


def serialize_program(program):
    if not program:
        return None
    return {
        "_id": str(program.get("_id")),
        "name": program.get("name"),
        "category": program.get("category"),
        "region": program.get("region"),
        "cost": program.get("cost"),
        "beneficiaries": program.get("beneficiaries"),
        "before_metric": program.get("before_metric"),
        "after_metric": program.get("after_metric"),
        "cost_per_beneficiary": program.get("cost_per_beneficiary"),
        "impact_score": program.get("impact_score"),
        "created_at": program.get("created_at"),
        "updated_at": program.get("updated_at"),
    }
