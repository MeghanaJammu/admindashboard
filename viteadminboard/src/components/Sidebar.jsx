import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaChartBar,
  FaUsers,
  FaBoxOpen,
  FaColumns,
  FaCalendarAlt,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";

const links = [
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Users", path: "/users", icon: <FaUsers /> },
  { name: "Products", path: "/products", icon: <FaBoxOpen /> },
  { name: "Kanban", path: "/kanban", icon: <FaColumns /> },
  { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  { name: "Chat", path: "/chat", icon: <FaComments /> },
  { name: "Charts", path: "/charts", icon: <FcComboChart /> },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 flex flex-col justify-between py-6 px-4 z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-3 right-3 text-xl cursor-pointer"
        style={{ color: "var(--text)" }}
      >
        <FaTimes />
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-6">DashBoard Lite</h1>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-[var(--hover)]"
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#fff" : "var(--text)",
              })}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-2 mt-6">
        {[
          "dark",
          "light",
          "blue",
          "green",
          "red",
          "cyan",
          "magenta",
          "lavender",
        ].map((mode) => (
          <button
            key={mode}
            onClick={() => toggleTheme(mode)}
            className="w-full py-1 rounded border text-sm transition capitalize"
            style={{
              backgroundColor: theme === mode ? "var(--accent)" : "transparent",
              color: theme === mode ? "#fff" : "var(--text)",
              borderColor: "var(--border)",
            }}
          >
            {mode}
          </button>
        ))}
      </div>
    </aside>
  );
}
