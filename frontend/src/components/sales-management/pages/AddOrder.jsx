import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';  // Adjust your axios setup

const Order = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    orderID: '',
    orderDate: '',
    quantity: 1,
    pid: '',
    buyer_id: '',
    saleID: '',
    status: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.orderID) {
      tempErrors.orderID = 'Order ID is required';
      isValid = false;
    }
    if (!formData.orderDate) {
      tempErrors.orderDate = 'Order date is required';
      isValid = false;
    }
    if (formData.quantity <= 0) {
      tempErrors.quantity = 'Quantity must be greater than 0';
      isValid = false;
    }
    if (!formData.pid) {
      tempErrors.pid = 'Product ID is required';
      isValid = false;
    }
    if (!formData.buyer_id) {
      tempErrors.buyer_id = 'Buyer ID is required';
      isValid = false;
    }
    if (!formData.saleID) {
      tempErrors.saleID = 'Sale ID is required';
      isValid = false;
    }
    if (!formData.status) {
      tempErrors.status = 'Status is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Order Data Submitted", formData);
      try {
        await sendRequest();
        alert('Order submitted successfully!');
        navigate('/admin/sales/manageorders');  // Navigate to ManageOrders after successful submission
      } catch (error) {
        alert('Error submitting order. Please try again.');
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  // Send request to the server
  const sendRequest = async () => {
    return await axios.post("http://localhost:3001/api/orders/", formData).then(res => res.data);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Order Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Information</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID</label>
                <input
                  type="text"
                  name="orderID"
                  value={formData.orderID}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.orderID ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.orderID && <p className="text-red-500">{errors.orderID}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order Date</label>
                <input
                  type="date"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.orderDate ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.orderDate && <p className="text-red-500">{errors.orderDate}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                  min="1"
                  required
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
              </div>
            </div>

            {/* Product and Buyer Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Product & Buyer Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Product ID</label>
                <input
                  type="text"
                  name="pid"
                  value={formData.pid}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.pid ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.pid && <p className="text-red-500">{errors.pid}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Buyer ID</label>
                <input
                  type="text"
                  name="buyer_id"
                  value={formData.buyer_id}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.buyer_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.buyer_id && <p className="text-red-500">{errors.buyer_id}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sale ID</label>
                <input
                  type="text"
                  name="saleID"
                  value={formData.saleID}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.saleID ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.saleID && <p className="text-red-500">{errors.saleID}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Processing/Completed/Cancelled"
                  required
                />
                {errors.status && <p className="text-red-500">{errors.status}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
