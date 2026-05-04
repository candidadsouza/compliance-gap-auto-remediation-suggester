import { useEffect, useState } from "react";

function ListPage() {
  const [data, setData] = useState([]);

  // load data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("records"));

    if (stored && stored.length > 0) {
      setData(stored);
    } else {
      const fallback = [
        {
          id: 1,
          title: "Compliance Record A",
          status: "OPEN",
          priority: "HIGH",
          score: 75,
        },
        {
          id: 2,
          title: "Compliance Record B",
          status: "CLOSED",
          priority: "MEDIUM",
          score: 60,
        },
      ];

      setData(fallback);
      localStorage.setItem("records", JSON.stringify(fallback));
    }
  }, []);

  // edit
  const handleEdit = (id) => {
    window.location.href = `/form?id=${id}`;
  };

  // delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this record?");
    if (!confirmDelete) return;

    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    localStorage.setItem("records", JSON.stringify(updated));
  };

  return (
    <div className="p-4 sm:p-6">

      {/* Header + Create Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Compliance Records
        </h1>

        <button
          onClick={() => (window.location.href = "/form")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create Record
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">

                {/* Title → Detail Page */}
                <td
                  className="p-2 border cursor-pointer text-blue-600"
                  onClick={() =>
                    (window.location.href = `/detail?id=${item.id}`)
                  }
                >
                  {item.title}
                </td>

                <td className="p-2 border">{item.status}</td>
                <td className="p-2 border">{item.priority}</td>
                <td className="p-2 border">{item.score}</td>

                {/* Actions */}
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;