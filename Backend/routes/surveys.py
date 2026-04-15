from flask import Blueprint, request, jsonify
from db import surveys_collection
from services.survey_service import build_survey_document

surveys_bp = Blueprint("surveys", __name__)


@surveys_bp.route("/surveys", methods=["POST"])
def submit_survey():
    data = request.get_json() or {}
    feedback = data.get("feedback", "").strip()

    if not feedback:
        return jsonify({"error": "Feedback text is required."}), 400

    survey = build_survey_document(feedback)
    result = surveys_collection.insert_one(survey)
    response_survey = {
        "id": str(result.inserted_id),
        "feedback": survey["feedback"],
        "sentiment": survey["sentiment"],
        "created_at": survey["created_at"],
    }

    return jsonify({"message": "Feedback submitted successfully.", "survey": response_survey}), 201


@surveys_bp.route("/surveys", methods=["GET"])
def get_surveys():
    surveys = list(surveys_collection.find().sort("created_at", -1))
    counts = {label: 0 for label in ["Excellent", "Good", "Better", "Neutral", "Bad", "Poor"]}
    for survey in surveys:
        sentiment = survey.get("sentiment", "Neutral")
        if sentiment not in counts:
            counts[sentiment] = 0
        counts[sentiment] += 1

    serialized = [
        {
            "id": str(survey.get("_id")),
            "feedback": survey.get("feedback"),
            "sentiment": survey.get("sentiment"),
            "created_at": survey.get("created_at"),
        }
        for survey in surveys
    ]

    return jsonify({
        "summary": {
            "total_surveys": len(serialized),
            "counts": counts,
        },
        "surveys": serialized,
    })
