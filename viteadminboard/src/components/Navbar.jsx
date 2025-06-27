import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <ThemeToggler />
    </div>
  );
}
