import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Placeholder data (replace with API later)
    setStats({
      total: 24,
      open: 10,
      closed: 9,
      high: 5,
    });
  }, []);

  if (!stats) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  const chartData = [
    { name: "Open", value: stats.open },
    { name: "Closed", value: stats.closed },
    { name: "High", value: stats.high },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-gray-600">Total</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-gray-600">Open</h2>
          <p className="text-2xl font-bold">{stats.open}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-gray-600">Closed</h2>
          <p className="text-2xl font-bold">{stats.closed}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-gray-600">High Priority</h2>
          <p className="text-2xl font-bold">{stats.high}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;