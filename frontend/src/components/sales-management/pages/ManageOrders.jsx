import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigateTo = useNavigate();

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search query
  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.pid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.buyer_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, orders]);

  // Handle update
  const handleUpdate = (order) => {
    navigateTo(`/admin/sales/manageorders/${order._id}`, { state: { order } });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/orders/${id}`);
      alert("Order deleted successfully");
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle report download
  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(`/orders/report/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Orders_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Order Management</h1>

      {/* Download Report Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleDownloadReport}
        >
          Download Full Report (PDF)
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, Product ID, or Buyer ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Order Date</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Product ID</th>
              <th className="py-2 px-4 text-left">Buyer ID</th>
              <th className="py-2 px-4 text-left">Sale ID</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{order.orderID}</td>
                  <td className="py-2 px-4 border">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{order.quantity}</td>
                  <td className="py-2 px-4 border">{order.pid}</td>
                  <td className="py-2 px-4 border">{order.buyer_id}</td>
                  <td className="py-2 px-4 border">{order.saleID}</td>
                  <td className="py-2 px-4 border">{order.status}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdate(order)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
