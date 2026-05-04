import os
import time
import json
from groq import Groq
from dotenv import load_dotenv
from services.cache import get_cached, set_cache

# ==============================
# CONFIG
# ==============================
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama-3.3-70b-versatile"   

client = Groq(api_key=GROQ_API_KEY)

MAX_RETRIES = 3
RETRY_DELAY = 1  # seconds

# ==============================
# METRICS
# ==============================
total_time = 0
request_count = 0

# ==============================
# CORE GROQ CALL
# ==============================
def call_groq(prompt: str):
    global total_time, request_count

    # 1. Check cache
    cached = get_cached(prompt)
    if cached:
        cached["is_fallback"] = False
        return cached

    for attempt in range(MAX_RETRIES):
        try:
            start = time.time()

            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "You are a helpful compliance AI assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=800
            )

            end = time.time()

            total_time += (end - start)
            request_count += 1

            content = response.choices[0].message.content.strip()

            try:
                result = json.loads(content)
            except:
                print("[JSON ERROR] Raw response:", content)
                return None
            
            result["is_fallback"] = False

            # Store in cache
            set_cache(prompt, result)

            return result

        except Exception as e:
            print(f"[Groq Error] Attempt {attempt+1}: {str(e)}")
            time.sleep(RETRY_DELAY * (attempt + 1))

    # If all retries fail
    return None


# ==============================
# FALLBACKS (IMPORTANT)
# ==============================
def fallback_description():
    return {
        "gap_title": "Unable to analyze gap",
        "severity": "Medium",
        "impact": "AI service temporarily unavailable",
        "recommendations": [
            "Retry the request after some time",
            "Manually review compliance controls",
            "Contact system administrator"
        ],
        "is_fallback": True
    }


def fallback_recommendations():
    return {
        "recommendations": [
            {
                "action_type": "Manual Review",
                "description": "Conduct manual compliance assessment.",
                "priority": "High"
            },
            {
                "action_type": "Monitoring",
                "description": "Enable temporary monitoring controls.",
                "priority": "Medium"
            },
            {
                "action_type": "Corrective Action",
                "description": "Apply interim remediation steps.",
                "priority": "High"
            }
        ],
        "is_fallback": True
    }


def fallback_report():
    return {
        "title": "Fallback Compliance Report",
        "summary": "AI service unavailable",
        "overview": "Unable to generate report due to temporary issue.",
        "key_items": ["AI unavailable", "Manual intervention required", "Retry needed"],
        "recommendations": [
            "Retry later",
            "Perform manual audit",
            "Escalate if issue persists"
        ],
        "is_fallback": True
    }


# ==============================
# PUBLIC FUNCTIONS
# ==============================
def generate_description(prompt):
    result = call_groq(prompt)
    if result:
        return result
    return fallback_description()


def generate_recommendations(prompt):
    result = call_groq(prompt)
    if result:
        return result
    return fallback_recommendations()


def generate_report(prompt):
    result = call_groq(prompt)
    if result:
        return result
    return fallback_report()