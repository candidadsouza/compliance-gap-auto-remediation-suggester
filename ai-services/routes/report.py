from flask import Blueprint, request, jsonify
from datetime import datetime
from services.groq_client import generate_report

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/generate-report", methods=["POST"])
def generate_report_route():

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

    with open("prompts/report.txt", "r", encoding="utf-8") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        standard=data["standard"],
        department=data["department"],
        control_area=data["control_area"],
        current_situation=data["current_situation"],
        expected_requirement=data["expected_requirement"],
        risk_level=data["risk_level"]
    )

    result = generate_report(prompt)

    response = {
        "title": result.get("title", ""),
        "summary": result.get("summary", ""),
        "overview": result.get("overview", ""),
        "key_items": result.get("key_items", []),
        "recommendations": result.get("recommendations", []),
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }

    return jsonify(response)