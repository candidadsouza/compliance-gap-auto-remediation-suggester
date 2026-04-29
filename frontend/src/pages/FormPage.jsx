import { useState, useEffect } from "react";
import API from "../services/api";

function FormPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "OPEN",
    priority: "MEDIUM",
    remediation: "",
  });

  const [editId, setEditId] = useState(null);

  // 🔁 Load edit data if exists
  useEffect(() => {
    const stored = localStorage.getItem("editData");

    if (stored) {
      const parsed = JSON.parse(stored);
      setFormData(parsed);
      setEditId(parsed.id);
    }
  }, []);

  // ✍️ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit (Create OR Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) {
      alert("Title and Description are required");
      return;
    }

    if (editId) {
      // 🔁 UPDATE (PUT)
      API.put(`/update/${editId}`, formData)
        .then(() => {
          alert("Record updated successfully");
          localStorage.removeItem("editData");
          window.location.href = "/";
        })
        .catch((err) => {
          console.error(err);
          alert("Error updating record");
        });
    } else {
      // ➕ CREATE (POST)
      API.post("/create", formData)
        .then(() => {
          alert("Record created successfully");
          window.location.href = "/";
        })
        .catch((err) => {
          console.error(err);
          alert("Error creating record");
        });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        {editId ? "Edit Compliance Record" : "Create Compliance Record"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="OPEN">OPEN</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          name="remediation"
          placeholder="Remediation"
          value={formData.remediation}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          {editId ? "Update" : "Submit"}
        </button>

      </form>
    </div>
  );
}

export default FormPage;