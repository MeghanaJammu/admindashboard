import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Charlie Ray", email: "charlie@example.com", role: "Viewer" },
];

const Users = () => {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { ...updatedUsers[editIndex], ...newUser };
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { id: nextId, ...newUser }]);
    }

    setNewUser({ name: "", email: "", role: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setNewUser(users[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">User Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setNewUser({ name: "", email: "", role: "" });
            setEditIndex(null);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          style={{
            backgroundColor: "var(--accent)",
            color: "white",
          }}
        >
          <FaPlus /> Add User
        </button>
      </div>

      {showForm && (
        <div
          className="p-6 rounded-xl shadow-md space-y-4 max-w-lg border"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none"
              style={{
                backgroundColor: "var(--input)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:outline-none"
              style={{
                backgroundColor: "var(--input)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none"
              style={{
                backgroundColor: "var(--input)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            />
          </div>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 rounded-lg hover:opacity-90 transition"
            style={{
              backgroundColor: "var(--success)",
              color: "white",
            }}
          >
            {editIndex !== null ? "Update User" : "Save User"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <div
          className="rounded-2xl shadow-xl p-6"
          style={{ backgroundColor: "var(--card)" }}
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--table-header)",
                  color: "var(--text)",
                }}
              >
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Role</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="transition-all duration-200"
                  style={{ color: "var(--text)" }}
                >
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEdit(index)}
                      style={{ color: "var(--accent)" }}
                      className="mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ color: "var(--danger)" }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 italic"
                    style={{ color: "var(--muted)" }}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
