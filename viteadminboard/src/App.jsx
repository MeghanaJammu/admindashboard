// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Reports from "./pages/Dashboard/Reports";
import Users from "./pages/Dashboard/Users";
import Products from "./pages/Dashboard/Products";
import Kanban from "./pages/Features/Kanban";
import Calendar from "./pages/Features/Calendar";
import Chat from "./pages/Features/Chat";
import Charts from "./pages/Features/Charts";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState("Reports");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex w-screen h-screen overflow-hidden relative">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main content */}
          <div
            className={`flex flex-col transition-all duration-300 flex-1 bg-black overflow-auto ${
              sidebarOpen ? "md:ml-64" : "ml-0"
            }`}
          >
            <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
            <main className="p-4 flex-1">
              <Routes>
                <Route path="/" element={<Reports />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/charts" element={<Charts />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
