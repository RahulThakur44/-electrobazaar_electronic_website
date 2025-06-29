import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://electrobazaar-backend-5.onrender.com/api/orders");
      const sorted = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOrders(sorted);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`https://electrobazaar-backend-5.onrender.com/api/orders/${id}`);
      alert("Order deleted successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete order.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://electrobazaar-backend-5.onrender.com/api/orders/${id}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    }
  };

  // 🔍 Filter orders by product name
  const filteredOrders = orders.filter((order) =>
    order.products?.some((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="mb-4 p-2 border rounded w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Contact</th>
            <th className="border p-5">Product Names</th>
            <th className="border p-5">Product Images</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user_id}</td>
              <td className="border p-2">{order.contact}</td>
              <td className="border p-2 text-left text-sm">
                {order.products?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {order.products.map((p, i) => (
                      <li key={i}>{p.product_name}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No products</span>
                )}
              </td>
              <td className="border p-2 text-left">
                <div className="flex flex-wrap gap-2">
                  {order.products?.length > 0 ? (
                    order.products.map((p, i) => (
                      <img
                        key={i}
                        src={p.product_image}
                        alt={p.product_name}
                        className="w-16 h-12 rounded object-cover border"
                      />
                    ))
                  ) : (
                    <span className="text-gray-500">No images</span>
                  )}
                </div>
              </td>
              <td className="border p-2">₹{order.total_amount.toFixed(2)}</td>
              <td className="border p-2">{order.payment_method}</td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border p-2 text-left text-sm break-words">{order.address}</td>
              <td className="border p-2 text-sm">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
