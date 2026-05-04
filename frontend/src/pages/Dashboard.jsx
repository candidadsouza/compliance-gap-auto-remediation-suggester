import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const stats = {
    total: 24,
    open: 10,
    closed: 9,
    high: 5,
  };

  const chartData = [
    { name: "Open", value: stats.open },
    { name: "Closed", value: stats.closed },
    { name: "High", value: stats.high },
  ];

  return (
    <div className="p-4 sm:p-6">

      {/* Header + Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => (window.location.href = "/list")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to List
        </button>

        <button
          onClick={() => (window.location.href = "/analytics")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Analytics
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p>Total</p>
          <p className="font-bold">{stats.total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p>Open</p>
          <p className="font-bold">{stats.open}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p>Closed</p>
          <p className="font-bold">{stats.closed}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p>High Priority</p>
          <p className="font-bold">{stats.high}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
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