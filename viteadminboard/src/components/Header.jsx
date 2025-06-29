import { FaBars } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <div
      className="p-4 shadow flex justify-between items-center"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        className="cursor-pointer text-xl"
        type="button"
        onClick={toggleSidebar}
        style={{ color: "var(--text)" }}
      >
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    </div>
  );
}
