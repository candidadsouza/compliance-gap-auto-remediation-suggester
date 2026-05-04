import { useState } from "react";

function AIPanel({ record }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateSuggestion = () => {
    setLoading(true);

    setTimeout(() => {
      let recommendation = "";
      let severity = "";
      let actions = [];
      let risk = "";
      let confidence = 0;

      // Severity
      if (record.priority === "HIGH") severity = "Critical";
      else if (record.priority === "MEDIUM") severity = "Moderate";
      else severity = "Low";

      // Risk
      if (record.score >= 70) risk = "High Risk";
      else if (record.score >= 40) risk = "Medium Risk";
      else risk = "Low Risk";

      const title = record.title.toLowerCase();

      if (title.includes("password")) {
        recommendation = "Weak password policy detected.";
        actions = [
          "Use strong passwords",
          "Enable MFA",
          "Rotate passwords",
        ];
        confidence = 92;
      } else if (title.includes("access")) {
        recommendation = "Access control issue detected.";
        actions = [
          "Apply RBAC",
          "Audit permissions",
        ];
        confidence = 90;
      } else if (title.includes("data")) {
        recommendation = "Data protection gap detected.";
        actions = [
          "Encrypt data",
          "Restrict access",
        ];
        confidence = 88;
      } else {
        recommendation = "General compliance gap.";
        actions = [
          "Review policies",
          "Apply best practices",
        ];
        confidence = 75;
      }

      setResult({
        recommendation,
        severity,
        actions,
        risk,
        confidence,
      });

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        🤖 AI Gap Remediation Suggester
      </h2>

      <button
        onClick={generateSuggestion}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Generate AI Suggestion
      </button>

      {loading && (
        <p className="mt-3 text-gray-500">Analyzing gap data...</p>
      )}

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Severity:</strong> {result.severity}</p>
          <p><strong>Risk:</strong> {result.risk}</p>

          <p className="mt-2">
            <strong>Recommendation:</strong> {result.recommendation}
          </p>

          <ul className="mt-2 list-disc pl-5">
            {result.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          <p className="mt-3">
            <strong>AI Confidence:</strong> {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
}

export default AIPanel;