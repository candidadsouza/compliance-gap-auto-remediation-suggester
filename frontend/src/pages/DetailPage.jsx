import { useEffect, useState } from "react";
import AIPanel from "../components/AIPanel";

function DetailPage() {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const records = JSON.parse(localStorage.getItem("records")) || [];
    const found = records.find((r) => r.id === id);

    if (found) {
      setRecord(found);
    }
  }, []);

  if (!record) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-bold mb-4">Detail</h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">
          <strong>{record.title}</strong>
        </p>
        <p>Status: {record.status}</p>
        <p>Priority: {record.priority}</p>
      </div>

      {/* ✅ AI Panel */}
      <AIPanel record={record} />
    </div>
  );
}

export default DetailPage;