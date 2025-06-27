import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Kanban from "./pages/Kanban";
import UsersTable from "./pages/UsersTable";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <BrowserRouter>
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-y-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/users" element={<UsersTable />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}
