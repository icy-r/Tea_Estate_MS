import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js'; // Assuming axios is set up for your API

const Invoice = () => {
  const navigate = useNavigate();

  // State to hold form data and error messages
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

  const [errors, setErrors] = useState({}); // State to hold validation errors

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // Clear the corresponding error if the input is changed
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
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

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.invoice_Number) {
      tempErrors.invoice_Number = 'Invoice Number is required';
      isValid = false;
    }
    if (!formData.title) {
      tempErrors.title = 'Invoice Title is required';
      isValid = false;
    }
    if (!formData.date) {
      tempErrors.date = 'Date is required';
      isValid = false;
    }
    if (!formData.name) {
      tempErrors.name = 'Customer Name is required';
      isValid = false;
    }
    if (!formData.id) {
      tempErrors.id = 'Order ID is required';
      isValid = false;
    }
    if (!formData.address) {
      tempErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.phone) {
      tempErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }
    if (formData.quantity <= 0) {
      tempErrors.quantity = 'Quantity must be greater than 0';
      isValid = false;
    }
    if (formData.uni_price < 0) {
      tempErrors.uni_price = 'Unit Price must be a positive number';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Invoice Data Submitted", formData);
      try {
        await sendRequest(); // This sends the invoice data to the server
        alert('Invoice submitted successfully!'); // Success alert
        navigate('/admin/sales/AddInvoice'); // Navigate to AddInvoice page after successful submission
      } catch (error) {
        alert('Error submitting invoice. Please try again.'); // Error alert
      }
    } else {
      alert('Please fix the errors in the form.'); // Alert for validation errors
    }
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
                  className={`w-full p-2 border ${errors.invoice_Number ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="INS5698"
                  required
                />
                {errors.invoice_Number && <p className="text-red-500">{errors.invoice_Number}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Title"
                  required
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
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
                  className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Customer Name"
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.id ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Order ID"
                  required
                />
                {errors.id && <p className="text-red-500">{errors.id}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Address"
                  required
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="10-digit Phone Number"
                  required
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  placeholder="Product Description"
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
                  className={`w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                  min="1"
                  required
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
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
                  className={`w-full p-2 border ${errors.uni_price ? 'border-red-500' : 'border-gray-300'} rounded`}
                  min="0"
                  required
                />
                {errors.uni_price && <p className="text-red-500">{errors.uni_price}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Subtotal</label>
                <input
                  type="text"
                  value={formData.subtotal.toFixed(2)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sales Tax (15%)</label>
                <input
                  type="text"
                  value={(formData.subtotal * formData.sales_tax).toFixed(2)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Grand Total</label>
                <input
                  type="text"
                  value={formData.grand_total.toFixed(2)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
