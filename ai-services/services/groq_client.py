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