from flask import Blueprint, request, jsonify
from datetime import datetime
from services.groq_client import generate_recommendations
from services.sanitizer import sanitize_input

recommend_bp = Blueprint("recommend_bp", __name__)

@recommend_bp.route("/recommend", methods=["POST"])
def recommend():

    data = request.get_json()

    # SANITIZATION STEP
    is_valid, result = sanitize_input(data)
    if not is_valid:
        return jsonify({"error": result}), 400

    data = result

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

    with open("prompts/recommend.txt", "r", encoding="utf-8") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        standard=data["standard"],
        department=data["department"],
        control_area=data["control_area"],
        current_situation=data["current_situation"],
        expected_requirement=data["expected_requirement"],
        risk_level=data["risk_level"]
    )

    try:
        result = generate_recommendations(prompt)
    except Exception as e:
        return jsonify({"error": "AI processing failed"}), 500

    response = {
        "recommendations": result.get("recommendations", []),
        "is_fallback": result.get("is_fallback", False), 
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }

    return jsonify(response)