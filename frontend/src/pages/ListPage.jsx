import { useEffect, useState } from "react";
import API from "../services/api";

function ListPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔁 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔄 Fetch data
  useEffect(() => {
    let url = "/all";
    const params = [];

    if (debouncedSearch) params.push(`q=${debouncedSearch}`);
    if (status) params.push(`status=${status}`);
    if (fromDate) params.push(`from=${fromDate}`);
    if (toDate) params.push(`to=${toDate}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    API.get(url)
      .then((res) => {
        setData(res.data.content || res.data);
      })
      .catch(() => {
        // fallback data
        setData([
          { id: 1, title: "Compliance A", status: "OPEN", priority: "HIGH" },
          { id: 2, title: "Compliance B", status: "CLOSED", priority: "MEDIUM" },
        ]);
      });
  }, [debouncedSearch, status, fromDate, toDate]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Compliance Records</h2>

      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status */}
        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* Date range */}
        <input
          type="date"
          className="border p-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* 🚀 ACTIONS */}
      <div className="flex gap-3 mb-4">

        {/* Export CSV */}
        <button
          onClick={() =>
            window.open("http://localhost:8080/export", "_blank")
          }
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>

        {/* Upload */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
              alert("File too large (max 2MB)");
              return;
            }

            const formData = new FormData();
            formData.append("file", file);

            fetch("http://localhost:8080/upload", {
              method: "POST",
              body: formData,
            })
              .then(() => alert("File uploaded"))
              .catch(() => alert("Upload failed"));
          }}
        />
      </div>

      {/* 📋 TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() =>
                (window.location.href = `/detail?id=${item.id}`)
              }
            >
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;