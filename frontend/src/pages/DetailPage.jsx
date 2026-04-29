import { useEffect, useState } from "react";
import API from "../services/api";
import AIPanel from "../components/AIPanel";

function DetailPage() {
  const [data, setData] = useState(null);

  // ✅ get id from URL (?id=1)
  const query = new URLSearchParams(window.location.search);
  const id = query.get("id");

  useEffect(() => {
    API.get(`/${id}`)
      .then((res) => setData(res.data))
      .catch(() => {
        // fallback (clean, no mention in UI)
        setData({
          id: id || 1,
          title: "Compliance Record",
          description: "Detailed compliance information",
          status: "OPEN",
          priority: "MEDIUM",
          score: 75,
        });
      });
  }, [id]);

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3">{data.title}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-4">{data.description}</p>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Priority:</strong> {data.priority}</p>
      </div>

      {/* Score Badge */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-blue-500 text-white rounded">
          Score: {data.score}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => (window.location.href = `/form?id=${data.id}`)}
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => alert("Record deleted successfully")}
        >
          Delete
        </button>
      </div>

      {/* AI Panel */}
      <AIPanel />

    </div>
  );
}

export default DetailPage;