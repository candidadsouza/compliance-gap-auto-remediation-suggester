import { useState, useEffect } from "react";

function FormPage() {
  const [form, setForm] = useState({
    title: "",
    status: "OPEN",
    priority: "MEDIUM",
    score: "",
  });

  const query = new URLSearchParams(window.location.search);
  const editId = query.get("id");

  // load existing data if editing
  useEffect(() => {
    if (editId) {
      const records =
        JSON.parse(localStorage.getItem("records")) || [];

      const record = records.find((r) => r.id === Number(editId));

      if (record) {
        setForm(record);
      }
    }
  }, [editId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let records =
      JSON.parse(localStorage.getItem("records")) || [];

    if (editId) {
      // update existing
      records = records.map((r) =>
        r.id === Number(editId) ? { ...form, id: Number(editId) } : r
      );
    } else {
      // create new
      const newRecord = {
        ...form,
        id: Date.now(),
      };
      records.push(newRecord);
    }

    localStorage.setItem("records", JSON.stringify(records));

    alert("Saved successfully");

    window.location.href = "/list";
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        {editId ? "Edit Record" : "Create Record"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Status Dropdown */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* Priority Dropdown */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        {/* Score */}
        <input
          type="number"
          name="score"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;