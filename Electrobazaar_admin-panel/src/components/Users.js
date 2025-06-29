import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://electrobazaar-backend-5.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Edit User
  const handleEditClick = (user) => {
    setEditUser(user);
    setEditedData({
      name: user.name,
      email: user.email,
      role: user.role || '',
      status: user.status || '',
    });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://electrobazaar-backend-5.onrender.com/api/users/${editUser.id}`,
        editedData
      );
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to update user.");
    }
  };

  // ✅ Delete
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await axios.delete(`https://electrobazaar-backend-5.onrender.com/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="p-6 main-content">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>

      {users.length === 0 ? (
        <p className="text-red-500">No users found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Registered</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editUser && (
        <div className="bg-white p-6 rounded shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">Edit User</h3>
          <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={editedData.name}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Full Name"
            />
            <input
              name="email"
              type="email"
              value={editedData.email}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Email"
            />
            <select
              name="role"
              value={editedData.role}
              onChange={handleEditChange}
              className="p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <select
              name="status"
              value={editedData.status}
              onChange={handleEditChange}
              className="p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="col-span-2 flex gap-4 mt-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
