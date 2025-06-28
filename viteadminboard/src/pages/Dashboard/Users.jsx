// src/pages/Dashboard/Users.jsx
import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Charlie Ray", email: "charlie@example.com", role: "Viewer" },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { ...updatedUsers[editIndex], ...newUser };
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      const nextId = Math.max(...users.map((u) => u.id)) + 1;
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-black">User Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setNewUser({ name: "", email: "", role: "" });
            setEditIndex(null);
          }}
          className="flex items-center gap-2 bg-blue-600 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-lg border border-gray-200">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow"
          >
            {editIndex !== null ? "Update User" : "Save User"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold text-sm uppercase tracking-wide">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Role</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 text-black transition-all duration-200"
                >
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
