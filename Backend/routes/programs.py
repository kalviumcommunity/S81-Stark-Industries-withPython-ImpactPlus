from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.program_service import (
    create_program,
    get_programs,
    update_program,
    delete_program,
    get_program_by_id,
)
from services.survey_service import compute_survey_adjustment_factor


def apply_adjusted_impact(program, factor):
    adjusted = program.copy()
    adjusted["adjusted_impact_score"] = round(adjusted.get("impact_score", 0) * factor, 4)
    return adjusted

programs_bp = Blueprint("programs", __name__)


@programs_bp.route("/programs", methods=["POST"])
@jwt_required()
def create_program_route():
    payload = request.get_json() or {}
    try:
        program = create_program(payload)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    return jsonify({"message": "Program created successfully.", "program": program}), 201


@programs_bp.route("/programs", methods=["GET"])
@jwt_required()
def list_programs_route():
    category = request.args.get("category")
    region = request.args.get("region")
    filters = {"category": category, "region": region}
    factor = compute_survey_adjustment_factor()
    programs = [apply_adjusted_impact(program, factor) for program in get_programs(filters)]
    return jsonify({"programs": programs, "survey_adjustment_factor": factor}), 200


@programs_bp.route("/programs/<program_id>", methods=["PUT"])
@jwt_required()
def update_program_route(program_id):
    payload = request.get_json() or {}
    try:
        updated = update_program(program_id, payload)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    if not updated:
        return jsonify({"error": "Program not found."}), 404
    return jsonify({"message": "Program updated successfully.", "program": updated}), 200


@programs_bp.route("/programs/<program_id>", methods=["DELETE"])
@jwt_required()
def delete_program_route(program_id):
    removed = delete_program(program_id)
    if not removed:
        return jsonify({"error": "Program not found."}), 404
    return jsonify({"message": "Program removed successfully."}), 200


@programs_bp.route("/programs/<program_id>", methods=["GET"])
@jwt_required()
def get_program_route(program_id):
    program = get_program_by_id(program_id)
    if not program:
        return jsonify({"error": "Program not found."}), 404
    return jsonify({"program": program}), 200
