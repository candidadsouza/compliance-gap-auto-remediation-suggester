import { useState } from "react";

function AIPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    setLoading(true);
    setResponse("");

    setTimeout(() => {
      setResponse(
        "Suggested remediation: Strengthen validation controls and improve compliance monitoring."
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-3">AI Suggestions</h3>

      <textarea
        className="w-full border p-2 mb-3"
        rows="3"
        placeholder="Ask AI for remediation suggestion..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ask AI
      </button>

      {loading && (
        <p className="mt-3 text-gray-500">Generating suggestion...</p>
      )}

      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIPanel;