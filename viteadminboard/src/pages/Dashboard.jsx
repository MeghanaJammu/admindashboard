import RevenueChart from "../charts/RevenueChart";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <RevenueChart />
    </div>
  );
}
