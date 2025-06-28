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

const links = [
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Users", path: "/users", icon: <FaUsers /> },
  { name: "Products", path: "/products", icon: <FaBoxOpen /> },
  { name: "Kanban", path: "/kanban", icon: <FaColumns /> },
  { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  { name: "Chat", path: "/chat", icon: <FaComments /> },
  { name: "Charts", path: "charts", icon: null },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { toggleTheme } = useTheme();

  return (
    <aside
      className={`fixed  top-0 left-0 h-full w-64 bg-[#0f172a] text-white flex flex-col justify-between py-6 px-4 z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute cursor-pointer top-3 right-3 text-white text-xl"
      >
        <FaTimes />
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-6">DashBoard X</h1>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                  isActive || activeTab === link.name
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-700"
                }`
              }
              onClick={() => {
                setActiveTab(link.name);
                setSidebarOpen(false); // close sidebar on mobile click
              }}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Theme buttons */}
      <div className="space-y-2 mt-6">
        <button
          onClick={() => toggleTheme("dark")}
          className="w-full py-1 bg-gray-700 rounded"
        >
          Dark
        </button>
        <button
          onClick={() => toggleTheme("light")}
          className="w-full py-1 bg-gray-200 text-black rounded"
        >
          Light
        </button>
        <button
          onClick={() => toggleTheme("blue")}
          className="w-full py-1 bg-blue-600 rounded"
        >
          Blue
        </button>
      </div>
    </aside>
  );
}
