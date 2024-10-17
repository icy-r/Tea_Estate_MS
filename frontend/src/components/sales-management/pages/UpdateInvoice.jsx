import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../services/axios.js';

const UpdateInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoice } = location.state; // Get the invoice data from navigation state

  const [formData, setFormData] = useState({
    invoice_Number: invoice.invoice_Number,
    title: invoice.title,
    date: invoice.date,
    name: invoice.name, // Customer Name
    address: invoice.address,
    phone: invoice.phone,
    grand_total: invoice.grand_total,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/invoices/${invoice._id}`, formData);
      alert("Invoice updated successfully");
      navigate("/admin/sales/addinvoice"); // Redirect to AddInvoice page after update
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Error updating invoice");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Update Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Invoice Number</label>
          <input
            type="text"
            name="invoice_Number"
            value={formData.invoice_Number}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Grand Total</label>
          <input
            type="number"
            name="grand_total"
            value={formData.grand_total}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Invoice
        </button>
      </form>
    </div>
  );
};

export default UpdateInvoice;
