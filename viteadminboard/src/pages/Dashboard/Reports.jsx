import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { WorldMap } from "react-svg-worldmap";

const lineChartData = [
  { name: "Jan", revenue: 100, expenses: 50 },
  { name: "Feb", revenue: 120, expenses: 70 },
  { name: "Mar", revenue: 180, expenses: 90 },
  { name: "Apr", revenue: 200, expenses: 120 },
];

const pieData = [
  { name: "Desktop", value: 15424 },
  { name: "Phone", value: 5546 },
  { name: "Laptop", value: 2478 },
];

const recentOrders = [
  { order: "#1234", date: "Dec 01, 2025", status: "Paid", total: "$199.00" },
  { order: "#1235", date: "Dec 02, 2025", status: "Pending", total: "$59.99" },
  {
    order: "#1236",
    date: "Dec 03, 2025",
    status: "Refunded",
    total: "$299.00",
  },
  { order: "#1237", date: "Dec 04, 2025", status: "Paid", total: "$120.00" },
];

const countryData = [
  { country: "us", value: 40 },
  { country: "in", value: 25 },
  { country: "gb", value: 15 },
  { country: "ca", value: 10 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Reports() {
  return (
    <div className="space-y-8" style={{ color: "var(--text)" }}>
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome back, Meghana</h1>
        <p style={{ color: "var(--muted)" }}>
          Here's what's happening with your dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Pageviews", "Monthly Users", "New Signups", "Subscriptions"].map(
          (label, i) => (
            <div
              key={i}
              className="p-4 rounded-lg shadow"
              style={{ backgroundColor: "var(--card)" }}
            >
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {label}
              </p>
              <h2 className="text-2xl font-bold mt-2">
                {Math.floor(Math.random() * 10000)}+
              </h2>
            </div>
          )
        )}
      </div>

      {/* Revenue Chart */}
      <div
        className="p-4 rounded-lg shadow w-full"
        style={{ backgroundColor: "var(--card)" }}
      >
        <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reports Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <div
          className="p-4 rounded-lg shadow"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h3 className="text-lg font-semibold mb-2">Users by Device</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 text-sm">
            {pieData.map((d) => (
              <li key={d.name}>
                {d.name}: <strong>{d.value.toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        </div>

        {/* Orders Table */}
        <div
          className="p-4 rounded-lg shadow"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "var(--muted)" }}>
                <th className="text-left pb-1">Order</th>
                <th className="text-left pb-1">Date</th>
                <th className="text-left pb-1">Status</th>
                <th className="text-left pb-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="py-2">{order.order}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor:
                          order.status === "Paid"
                            ? "#16a34a"
                            : order.status === "Pending"
                            ? "#eab308"
                            : "#dc2626",
                        color: "#fff",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users by Country with SVG Map */}
      <div
        className="p-4 rounded-lg shadow"
        style={{ backgroundColor: "var(--card)" }}
      >
        <h3 className="text-lg font-semibold mb-4">Users by Country</h3>
        <div className="w-full overflow-hidden rounded">
          <WorldMap
            data={countryData}
            color="cyan"
            size="responsive"
            valueSuffix="%"
            backgroundColor="var(--card)"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          <div>
            🇺🇸 US: <strong>40%</strong>
          </div>
          <div>
            🇮🇳 India: <strong>25%</strong>
          </div>
          <div>
            🇬🇧 UK: <strong>15%</strong>
          </div>
          <div>
            🇨🇦 Canada: <strong>10%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
