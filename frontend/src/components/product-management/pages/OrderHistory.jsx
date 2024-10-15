import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [buyers, setBuyers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigateTo = useNavigate();

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/");
      setOrders(response.data);
      // Fetch product and buyer details after orders are fetched
      fetchProducts(response.data.map(order => order.pid));
      fetchBuyers(response.data.map(order => order.buyer_id));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const responses = await Promise.all(
        productIds.map(id => axios.get(`/products/${id}`))
      );
      const productData = {};
      responses.forEach(res => {
        const product = res.data;
        productData[product._id] = product.name; // Assuming product has an id and name
      });
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBuyers = async (buyerIds) => {
    try {
      const responses = await Promise.all(
        buyerIds.map(id => axios.get(`/buyers/${id}`))
      );
      const buyerData = {};
      responses.forEach(res => {
        const buyer = res.data;
        buyerData[buyer._id] = {
          name: buyer.name, // Assuming buyer has an id and name
          company: buyer.company // Assuming buyer has a company field
        };
      });
      setBuyers(buyerData);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Order Management</h1>

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

      {/* Orders Cards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            const productName = products[order.pid] || "Unknown Product";
            const buyerDetails = buyers[order.buyer_id] || { name: "Unknown Buyer", company: "Unknown Company" };
            return (
              <div key={order._id} className="border p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold">Order ID: {order.orderID}</h2>
                <p><strong>Product Name:</strong> {productName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Buyer Name:</strong> {buyerDetails.name}</p>
                <p><strong>Company Name:</strong> {buyerDetails.company}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <div className="flex justify-center mt-4">
                  
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md flex align-center"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">No orders available</div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
