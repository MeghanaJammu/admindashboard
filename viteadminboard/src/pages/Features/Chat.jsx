import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaSearch, FaFileAlt } from "react-icons/fa";

const usersData = [
  {
    id: 1,
    name: "Meghana Jammu",
    username: "@meghana",
    time: "5 min ago",
    active: true,
    message: "Hey! Did you check the analytics report?",
  },
  {
    id: 2,
    name: "Gagan",
    username: "@gagan",
    time: "10 min ago",
    active: false,
    message: "Let’s catch up after the meeting.",
  },
  {
    id: 3,
    name: "Vyshnavi",
    username: "@vyshnavi",
    time: "12 min ago",
    active: false,
    message: "Sent the final version of the file!",
  },
  {
    id: 4,
    name: "Karthikeya",
    username: "@karthik",
    time: "20 min ago",
    active: false,
    message: "Good job on the Kanban update!",
  },
  {
    id: 5,
    name: "Somrima",
    username: "@somrima",
    time: "30 min ago",
    active: false,
    message: "Ping me when free!",
  },
  {
    id: 6,
    name: "Shikhar",
    username: "@shikhar",
    time: "1 hour ago",
    active: false,
    message: "Final deployment done!",
  },
];

const defaultChatHistories = {
  meghana: [
    {
      from: "them",
      text: "Hey! Did you check the analytics report?",
      time: "10:15 AM",
    },
    {
      from: "me",
      text: "Yes! It looks solid. Loved your insights!",
      time: "10:17 AM",
    },
    {
      from: "them",
      text: "Thanks! Shall we review it together later today?",
      time: "10:18 AM",
    },
    { from: "them", image: true, text: "chart.jpg", time: "10:19 AM" },
    {
      from: "them",
      file: true,
      text: "analytics-report.pdf",
      time: "10:20 AM",
    },
  ],
  gagan: [
    { from: "me", text: "Hey bro, are we meeting at 4?", time: "11:00 AM" },
    { from: "them", text: "Yes, sharp!", time: "11:02 AM" },
  ],
  vyshnavi: [
    { from: "them", text: "Final version uploaded.", time: "09:50 AM" },
    { from: "me", text: "Got it! Great work.", time: "09:52 AM" },
  ],
  karthik: [
    {
      from: "them",
      text: "Can you review the Kanban tasks today?",
      time: "8:00 AM",
    },
    { from: "me", text: "Already on it!", time: "8:05 AM" },
  ],
  somrima: [{ from: "them", text: "Hey! Got a minute?", time: "10:00 AM" }],
  shikhar: [{ from: "them", text: "Deployment is live 🚀", time: "7:30 AM" }],
};

const getStorageKey = (username) => `chat-history-${username}`;

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(usersData[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const key = getStorageKey(selectedUser.username.replace("@", ""));
    const saved = localStorage.getItem(key);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(
        defaultChatHistories[selectedUser.username.replace("@", "")] || []
      );
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    const key = getStorageKey(selectedUser.username.replace("@", ""));
    localStorage.setItem(key, JSON.stringify(updatedMessages));

    setInput("");
  };

  const switchUser = (user) => setSelectedUser(user);

  return (
    <div
      className="chat-page flex h-[calc(100vh-80px)] overflow-hidden"
      style={{ backgroundColor: "var(--background)", color: "var(--text)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-full md:w-1/3 lg:w-1/4 border-r p-4 flex flex-col"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button
            className="px-3 py-1 rounded text-sm"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            New
          </button>
        </div>

        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 rounded focus:outline-none"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
        </div>

        <div className="space-y-3 overflow-auto flex-1">
          {usersData.map((user) => (
            <div
              key={user.id}
              onClick={() => switchUser(user)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedUser.id === user.id
                  ? "bg-[var(--border)]"
                  : "hover:bg-[var(--hover)]"
              }`}
              style={{
                backgroundColor:
                  selectedUser.id === user.id ? "var(--hover)" : "transparent",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p style={{ color: "var(--text-muted)" }} className="text-sm">
                    {user.username}
                  </p>
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {user.time}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {user.message}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <div
        className="flex-1 flex flex-col justify-between p-4"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center pb-3 mb-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p className="text-lg font-bold">{selectedUser.name}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {selectedUser.username}
            </p>
          </div>
          <button
            className="px-3 py-1 rounded text-sm"
            style={{ backgroundColor: "var(--danger)", color: "#fff" }}
          >
            Call {selectedUser.name.split(" ")[0]}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow`}
                style={{
                  backgroundColor:
                    msg.from === "me" ? "var(--accent)" : "var(--card)",
                  color: "#fff",
                  textAlign: msg.from === "me" ? "right" : "left",
                }}
              >
                {msg.image ? (
                  <img
                    src="https://placehold.co/200x150"
                    alt="Sent"
                    className="rounded"
                  />
                ) : msg.file ? (
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-pink-400" />
                    <span className="text-sm">{msg.text}</span>
                  </div>
                ) : (
                  <p className="text-sm">{msg.text}</p>
                )}
                <p
                  className="text-[10px] mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          className="mt-3 pt-3 flex items-center gap-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded text-sm focus:outline-none"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 rounded hover:opacity-90"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
