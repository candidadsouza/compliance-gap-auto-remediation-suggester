import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [period, setPeriod] = useState("week");

  const dataMap = {
    day: [
      { name: "Mon", value: 2 },
      { name: "Tue", value: 4 },
    ],
    week: [
      { name: "Week 1", value: 10 },
      { name: "Week 2", value: 15 },
    ],
    month: [
      { name: "Jan", value: 40 },
      { name: "Feb", value: 30 },
    ],
  };

  const data = dataMap[period];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Analytics</h1>

      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;