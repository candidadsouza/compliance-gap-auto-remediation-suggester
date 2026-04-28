import time
from services.cache import get_cached, set_cache

# global metrics
total_time = 0
request_count = 0

MODEL_NAME = "mock-groq-model" #will be replaced with correct model name later

def generate_report(prompt):
    global total_time, request_count

    # check cache
    cached = get_cached(prompt)
    if cached:
        return cached

    start = time.time()

    # MOCK RESPONSE (replace with real Groq later)
    result = {
        "title": "Compliance Gap Assessment Report",
        "summary": "A high-risk access control issue identified.",
        "overview": "Weak password policy increases risk.",
        "key_items": [
            "Weak password length",
            "No complexity rules",
            "Unauthorized access risk"
        ],
        "recommendations": [
            "Implement 12-character passwords",
            "Enable monitoring",
            "Reset weak passwords"
        ]
    }

    end = time.time()

    # update metrics
    total_time += (end - start)
    request_count += 1

    # store in cache
    set_cache(prompt, result)

    return result

def generate_description(prompt):
    return {
        "gap_title": "Insufficient Password Complexity",
        "severity": "High",
        "impact": "Weak passwords increase unauthorized access risk.",
        "recommendations": [
            "Implement a minimum 12-character password policy.",
            "Enable monitoring for weak credentials.",
            "Reset existing non-compliant passwords."
        ]
    }

def generate_recommendations(prompt):
    return {
        "recommendations": [
            {
                "action_type": "Policy Update",
                "description": "Implement a minimum 12-character password policy.",
                "priority": "High"
            },
            {
                "action_type": "Monitoring",
                "description": "Enable password compliance monitoring.",
                "priority": "Medium"
            },
            {
                "action_type": "Corrective Action",
                "description": "Reset all weak passwords immediately.",
                "priority": "High"
            }
        ]
    }
