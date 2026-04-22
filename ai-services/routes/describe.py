from flask import Blueprint, request, jsonify
from datetime import datetime
from services.groq_client import generate_description

describe_bp = Blueprint("describe_bp", __name__)

@describe_bp.route("/describe", methods=["POST"])
def describe():

    data = request.get_json()

    required_fields = [
        "standard",
        "department",
        "control_area",
        "current_situation",
        "expected_requirement",
        "risk_level"
    ]

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Load prompt file
    with open("prompts/describe.txt", "r", encoding="utf-8") as file:
        prompt_template = file.read()

    # Replace placeholders
    prompt = prompt_template.format(
        standard=data["standard"],
        department=data["department"],
        control_area=data["control_area"],
        current_situation=data["current_situation"],
        expected_requirement=data["expected_requirement"],
        risk_level=data["risk_level"]
    )

    # Call mock AI service
    result = generate_description(prompt)

    response = {
        "gap_title": result.get("gap_title", ""),
        "severity": result.get("severity", ""),
        "impact": result.get("impact", ""),
        "recommendations": result.get("recommendations", []),
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }

    return jsonify(response)