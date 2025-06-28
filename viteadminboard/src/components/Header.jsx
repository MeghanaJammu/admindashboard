import { FaBars } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <div className="bg-gray-800 p-4 shadow flex justify-between items-center">
      {/* Hamburger icon for mobile only */}
      <button className="text-white text-xl" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    </div>
  );
}
