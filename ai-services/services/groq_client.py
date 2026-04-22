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