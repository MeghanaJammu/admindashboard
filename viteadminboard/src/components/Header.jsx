import { FaBars } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <div className="bg-gray-800 p-4 shadow flex justify-between items-center">
      <button
        className="text-white cursor-pointer text-xl"
        type="button"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    </div>
  );
}
