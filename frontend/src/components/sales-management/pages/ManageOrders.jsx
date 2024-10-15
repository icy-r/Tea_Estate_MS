import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
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
      const response = await axios.get('/orders/');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch buyers from backend
  const fetchBuyers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/buyers'); // Adjust as necessary
      setBuyers(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };
   

  useEffect(() => {
    fetchOrders();
    fetchBuyers();

  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        (order.orderID && order.orderID.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.pid && order.pid.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.buyer_id && order.buyer_id.toLowerCase().includes(searchQuery.toLowerCase()))
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
      alert('Order deleted successfully');
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Function to generate and download the PDF report for orders
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Order ID", "Order Date", "Quantity", "Product ID", "Buyer ID", "Status"];
    const tableRows = [];

    // Add each order data to the table rows
    filteredOrders.forEach((order) => {
      const orderData = [
        order.orderID,
        new Date(order.orderDate).toLocaleDateString(),
        order.quantity,
        order.pid,
        order.buyer_id,
        order.status,
      ];
      tableRows.push(orderData);
    });

    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Order Report", 14, 15);
    doc.save("Orders_Report.pdf"); // Save the PDF
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
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{order.orderID || 'N/A'}</td>
                  <td className="py-2 px-4 border">{new Date(order.orderDate).toLocaleDateString() || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.quantity || 0}</td>
                  
                  <td className="border px-4 py-2">
  {order.pid
    ? (() => {
        const product = products.find(p => p._id === order.pid);
        return product ? product.name : 'Unknown Product';
      })()
    : 'N/A'}
</td>


                  <td className="py-2 px-4 border">{order.buyer_id || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.status || 'N/A'}</td>
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
                <td colSpan="7" className="text-center py-4">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
