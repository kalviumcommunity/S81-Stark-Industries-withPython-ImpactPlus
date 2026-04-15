from flask import Blueprint, jsonify
from db import programs_collection
from bson.objectid import ObjectId
from datetime import datetime
from services.survey_service import compute_survey_adjustment_factor

analytics_bp = Blueprint("analytics", __name__)


def serialize_program(program):
    result = {
        "_id": str(program.get("_id")),
        "name": program.get("name"),
        "category": program.get("category"),
        "region": program.get("region"),
        "cost": program.get("cost"),
        "beneficiaries": program.get("beneficiaries"),
        "impact_score": program.get("impact_score"),
        "cost_per_beneficiary": program.get("cost_per_beneficiary"),
        "created_at": program.get("created_at"),
    }
    if program.get("adjusted_impact_score") is not None:
        result["adjusted_impact_score"] = program.get("adjusted_impact_score")
    return result


def safe_float(value, default=0.0):
    try:
        return float(value)
    except Exception:
        return default


def apply_adjusted_impact(program, factor):
    program = program.copy()
    program["adjusted_impact_score"] = round(safe_float(program.get("impact_score")) * factor, 4)
    return program


def gather_trend_data(programs):
    monthly = {}
    for program in programs:
        created_at = program.get("created_at")
        if not created_at:
            continue
        month = created_at[:7]
        monthly.setdefault(month, {"impact": 0.0, "budget": 0.0, "programs": 0})
        monthly[month]["impact"] += safe_float(program.get("impact_score"))
        monthly[month]["budget"] += safe_float(program.get("cost"))
        monthly[month]["programs"] += 1
    sorted_months = sorted(monthly.items())
    return [
        {"month": month, "averageImpact": round(values["impact"] / max(values["programs"], 1), 4), "budget": round(values["budget"], 2)}
        for month, values in sorted_months
    ]


def aggregate_by_field(programs, field):
    result = {}
    for program in programs:
        key = program.get(field, "Unknown")
        result[key] = result.get(key, 0) + safe_float(program.get("cost"))
    return [{"name": key, "value": round(value, 2)} for key, value in result.items()]


@analytics_bp.route("/analytics", methods=["GET"])
def analytics_route():
    programs = list(programs_collection.find())
    factor = compute_survey_adjustment_factor()
    adjusted_programs = [apply_adjusted_impact(program, factor) for program in programs]

    total_programs = len(programs)
    total_beneficiaries = sum(int(p.get("beneficiaries", 0)) for p in programs)
    avg_impact = round(sum(safe_float(p.get("impact_score")) for p in programs) / max(total_programs, 1), 4)
    avg_impact_adjusted = round(sum(safe_float(p.get("adjusted_impact_score")) for p in adjusted_programs) / max(total_programs, 1), 4)
    total_budget = round(sum(safe_float(p.get("cost")) for p in programs), 2)
    category_distribution = aggregate_by_field(programs, "category")
    region_distribution = aggregate_by_field(programs, "region")
    trend_data = gather_trend_data(programs)
    return jsonify({
        "summary": {
            "total_programs": total_programs,
            "total_beneficiaries": total_beneficiaries,
            "average_impact_score": avg_impact,
            "average_adjusted_impact_score": avg_impact_adjusted,
            "total_budget": total_budget,
            "survey_adjustment_factor": factor,
        },
        "category_distribution": category_distribution,
        "region_distribution": region_distribution,
        "trend_data": trend_data,
    })


@analytics_bp.route("/recommendations", methods=["GET"])
def recommendations_route():
    programs = list(programs_collection.find())
    factor = compute_survey_adjustment_factor()
    adjusted_programs = [apply_adjusted_impact(program, factor) for program in programs]
    top_impact = sorted(adjusted_programs, key=lambda item: safe_float(item.get("adjusted_impact_score")), reverse=True)[:5]
    best_cost = sorted(programs, key=lambda item: safe_float(item.get("cost_per_beneficiary")))[:5]
    return jsonify({
        "top_by_impact": [serialize_program(program) for program in top_impact],
        "top_by_cost_efficiency": [serialize_program(program) for program in best_cost],
        "survey_adjustment_factor": factor,
        "message": "Allocate more budget to high-impact, cost-effective programs. Survey sentiment has been included in impact ranking.",
    })
