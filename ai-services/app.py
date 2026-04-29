from flask import Flask, jsonify
from flask_cors import CORS
from routes.describe import describe_bp
from routes.recommend import recommend_bp
from routes.report import report_bp
from routes.health import health_bp

app = Flask(__name__)
# Security Headers
@app.after_request
def add_security_headers(response):
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=()"
    
    response.headers["Server"] = "SecureServer"

    return response

CORS(app)

app.register_blueprint(describe_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(report_bp)
app.register_blueprint(health_bp)

@app.route("/")
def home():
    return jsonify({"message": "AI Service Running"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)