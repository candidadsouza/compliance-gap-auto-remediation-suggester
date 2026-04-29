import re

# Basic patterns for prompt injection / malicious input
SUSPICIOUS_PATTERNS = [
    r"<script.*?>.*?</script>",        # HTML script
    r"ignore previous instructions",   # prompt injection
    r"system prompt",                 
    r"you are chatgpt",               
    r"act as",                        
    r"pretend to",                    
    r"bypass",                        
    r"override",                      
]

def is_malicious(text: str) -> bool:
    text = text.lower()

    for pattern in SUSPICIOUS_PATTERNS:
        if re.search(pattern, text):
            return True

    return False


def sanitize_input(data: dict):
    for key, value in data.items():
        if isinstance(value, str):
            # Check malicious patterns
            if is_malicious(value):
                return False, f"Malicious input detected in field: {key}"

            # Remove HTML tags (basic)
            clean_value = re.sub(r"<.*?>", "", value)

            # Trim spaces
            data[key] = clean_value.strip()

    return True, data