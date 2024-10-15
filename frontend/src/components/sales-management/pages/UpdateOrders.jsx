import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateOrder from '../services/axios-orderUpdate.js'; // Make sure to implement this service

const UpdateOrder = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const order = location.state.order; // Get order data from location state

  const [orderData, setOrderData] = useState({
    orderID: order.orderID,
    orderDate: order.orderDate,
    quantity: order.quantity,
    pid: order.pid,
    buyer_id: order.buyer_id,
    saleID: order.saleID,
    status: order.status,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(orderData);
    
    try {
      await updateOrder(orderData, order._id); // Pass the order ID to the update function
      alert('Order updated successfully!'); // Optional: Alert on success
      navigateTo('/admin/sales/manageorders'); // Navigate to ManageOrders after successful update
    } catch (error) {
      alert('Error updating order. Please try again.'); // Optional: Alert on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Order</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="orderID"
            value={orderData.orderID}
            onChange={handleChange}
            placeholder="Order ID"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly // Order ID should not be editable
          />
          <input
            name="orderDate"
            type="date" // Use date input for order date
            value={orderData.orderDate.substring(0, 10)} // Format the date
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="pid"
            value={orderData.pid}
            onChange={handleChange}
            placeholder="Product ID"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="buyer_id"
            value={orderData.buyer_id}
            onChange={handleChange}
            placeholder="Buyer ID"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="saleID"
            value={orderData.saleID}
            onChange={handleChange}
            placeholder="Sale ID"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="status"
            value={orderData.status}
            onChange={handleChange}
            placeholder="Status"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Confirm Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
