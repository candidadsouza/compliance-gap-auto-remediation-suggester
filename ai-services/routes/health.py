from flask import Blueprint, jsonify
import time
from services.groq_client import total_time, request_count, MODEL_NAME

health_bp = Blueprint("health_bp", __name__)

start_time = time.time()

@health_bp.route("/health", methods=["GET"])
def health():

    uptime = int(time.time() - start_time)

    avg_response_time = 0
    if request_count > 0:
        avg_response_time = round((total_time / request_count) * 1000, 2)

    return jsonify({
        "status": "ok",
        "model": MODEL_NAME,
        "avg_response_time_ms": avg_response_time,
        "uptime_seconds": uptime
    })