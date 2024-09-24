import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';  // Assuming axios is set up for your API


const Invoice = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    invoice_Number: '',
    title: '',
    date: '',
    name: '',
    id: '',
    address: '',
    phone: '',
    description: '',
    quantity: 1,
    uni_price: 0,
    subtotal: 0,
    sales_tax: 0.15,  // Assuming 15% tax for example
    grand_total: 0,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Calculate totals whenever quantity or price changes
  const calculateTotals = () => {
    const subtotal = formData.quantity * formData.uni_price;
    const taxAmount = subtotal * formData.sales_tax;
    const grandTotal = subtotal + taxAmount;
    
    setFormData((prevData) => ({
      ...prevData,
      subtotal,
      grand_total: grandTotal,
    }));
  };

  // Handle form submission
  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log("Invoice Data Submitted", formData);
    sendRequest().then(()=>history.push('/InvoiceDetails'))
  
  };

  // Send request to the server
  const sendRequest = async () => {
    return await axios.post("http://localhost:3001/api/invoices/", {
      invoice_Number: String(formData.invoice_Number),
      title: String(formData.title),
      date: String(formData.date),
      name: String(formData.name),
      id: String(formData.id),
      address: String(formData.address),
      phone: String(formData.phone),
      description: String(formData.description),
      quantity: String(formData.quantity),
      uni_price: String(formData.uni_price),
      subtotal: String(formData.subtotal),
      sales_tax: String(formData.sales_tax),
      grand_total: String(formData.grand_total),
    }).then(res => res.data);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-center">Generate Invoice</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded">LOGOUT</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Company Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Company Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Number</label>
                <input
                  type="text"
                  name="invoice_Number"
                  value={formData.invoice_Number}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="INS5698"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Customer Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Order ID"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Street Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="07X XXXXXXX"
                  required
                />
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Product Description"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={(e) => {
                    handleChange(e);
                    calculateTotals();
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Units"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Unit Price</label>
                <input
                  type="number"
                  name="uni_price"
                  value={formData.uni_price}
                  onChange={(e) => {
                    handleChange(e);
                    calculateTotals();
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Subtotal</label>
                <input
                  type="text"
                  name="subtotal"
                  value={formData.subtotal.toFixed(2)}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sales Tax (15%)</label>
                <input
                  type="text"
                  name="sales_tax"
                  value={(formData.subtotal * formData.sales_tax).toFixed(2)}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Grand Total</label>
                <input
                  type="text"
                  name="grand_total"
                  value={formData.grand_total.toFixed(2)}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <div>
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
              >
                GENERATE INVOICE
              </button>
              <button
                type="reset"
                onClick={() => setFormData({})}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                CLEAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
