# AI Service – Compliance Gap Auto-Remediation

> This is the AI service module of the main project.
> For full project setup (frontend + backend), refer to the root `README.md`.

---

## Overview

This AI service analyzes compliance gaps and generates remediation suggestions and reports using AI. It is built using **Python (Flask)** and provides structured JSON responses.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tecsxpert/compliance-gap-auto-remediation-suggester
cd ai-services
```

---

### 2. Create Virtual Environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Redis Setup

This service uses Redis for caching AI responses to improve performance.

### Start Redis Server

Ensure Redis is running on:

```
localhost:6379
```

### Verify Redis

```bash
redis-cli ping
```

Expected output:

```
PONG
```

---

## Environment Variables

Create a `.env` file inside the `ai-services` folder:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Run the Application

```bash
python app.py
```

The service will run at:

```
http://localhost:5000
```

---

## API Endpoints

---

### 🔹 POST /describe

**Description:**
Analyzes the compliance gap and returns severity, impact, and recommendations.

#### Request Example

```json
{
  "standard": "ISO 27001",
  "department": "IT",
  "control_area": "Access Control",
  "current_situation": "Users are using weak passwords",
  "expected_requirement": "Strong password policy required",
  "risk_level": "High"
}
```

#### Response Example

```json
{
  "gap_title": "Weak Password Policy",
  "severity": "High",
  "impact": "Risk of unauthorized access",
  "recommendations": [
    "Enforce strong passwords",
    "Monitor login attempts",
    "Reset weak credentials"
  ],
  "is_fallback": false,
  "generated_at": "2026-04-30T10:00:00Z"
}
```

---

### 🔹 POST /recommend

**Description:**
Generates structured remediation recommendations.

#### Response Example

```json
{
  "recommendations": [
    {
      "action_type": "Policy Update",
      "description": "Enforce password complexity rules",
      "priority": "High"
    },
    {
      "action_type": "Monitoring",
      "description": "Track failed login attempts",
      "priority": "Medium"
    },
    {
      "action_type": "Corrective Action",
      "description": "Reset weak passwords",
      "priority": "High"
    }
  ],
  "is_fallback": false,
  "generated_at": "2026-04-30T10:00:00Z"
}
```

---

### 🔹 POST /generate-report

**Description:**
Generates a structured compliance report.

#### Response Example

```json
{
  "title": "Password Policy Compliance Gap",
  "summary": "Weak password controls identified",
  "overview": "Users are using weak passwords which increases risk",
  "key_items": [
    "Weak password policy",
    "No monitoring controls",
    "High risk exposure"
  ],
  "recommendations": [
    "Implement password policy",
    "Enable monitoring",
    "Reset weak credentials"
  ],
  "is_fallback": false,
  "generated_at": "2026-04-30T10:00:00Z"
}
```

---

### 🔹 GET /health

**Description:**
Returns the service health status.

#### Response Example

```json
{
  "status": "ok",
  "model": "llama-3.3-70b-versatile",
  "avg_response_time_ms": 500,
  "uptime_seconds": 120
}
```

---

## Features

* AI-based compliance gap analysis
* Structured JSON responses
* Redis caching (15-minute TTL)
* Fallback handling using `is_fallback`
* Input sanitization
* Security headers implemented

---

## Testing

You can test all endpoints using **Postman**.

---

## Notes

* Ensure Redis server is running
* Provide a valid Groq API key
* Follow correct JSON format in requests

---

## Developed As Part Of

Compliance Gap Auto-Remediation Suggester Project
