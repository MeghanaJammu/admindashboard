import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-white dark:bg-gray-800 shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/kanban">Kanban</Link>
        <Link to="/users">Users</Link>
      </nav>
    </div>
  );
}
