import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

const defaultLineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const monthlyLineData = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 300 },
  { name: "Week 3", value: 250 },
  { name: "Week 4", value: 400 },
];

const barData = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
];

const pieData = [
  { name: "Mobile", value: 45 },
  { name: "Desktop", value: 30 },
  { name: "Tablet", value: 25 },
];

const radarData = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Sales", A: 98, B: 130, fullMark: 150 },
  { subject: "Tech", A: 86, B: 130, fullMark: 150 },
  { subject: "HR", A: 99, B: 100, fullMark: 150 },
];

export default function Charts() {
  const [filter, setFilter] = useState("yearly");
  const lineData = filter === "monthly" ? monthlyLineData : defaultLineData;

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--text)" }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Visual insights from your recent data
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart Card */}
      {[
        {
          title: `Visitors Trend (${filter})`,
          chart: (
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text)" />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  color: "var(--text)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          ),
        },
        {
          title: "Revenue Over Time",
          chart: (
            <AreaChart data={defaultLineData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text)" />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  color: "var(--text)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          ),
        },
        {
          title: "User Growth by Page",
          chart: (
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text)" />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  color: "var(--text)",
                }}
              />
              <Legend />
              <Bar dataKey="pv" fill="#6366f1" />
              <Bar dataKey="uv" fill="#10b981" />
            </BarChart>
          ),
        },
        {
          title: "User Device Distribution",
          chart: (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  color: "var(--text)",
                }}
              />
              <Legend />
            </PieChart>
          ),
        },
        {
          title: "Department Performance",
          chart: (
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text)" />
              <PolarRadiusAxis stroke="var(--text)" />
              <Radar
                name="Dept A"
                dataKey="A"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
              <Radar
                name="Dept B"
                dataKey="B"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
              />
              <Legend />
            </RadarChart>
          ),
        },
      ].map(({ title, chart }, idx) => (
        <div
          key={idx}
          className="rounded-lg shadow p-4"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h2 className="text-lg font-medium mb-2">{title}</h2>
          <ResponsiveContainer width="100%" height={300}>
            {chart}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
