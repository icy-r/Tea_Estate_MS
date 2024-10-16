import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';  // Adjust this import path as needed

const Order = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    orderID: '', // Auto-generated (to be set after submission)
    orderDate: '',
    quantity: 1,
    pid: '',       // Product ID
    buyer_id: '',  // Buyer ID
    status: 'Processing', // Default status
  });

  const [errors, setErrors] = useState({});
  const [buyers, setBuyers] = useState([]);   // For storing buyer list
  const [products, setProducts] = useState([]);  // For storing product list

  // Fetch Buyers and Products
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const buyerResponse = await axios.get('http://localhost:3001/api/buyers');
        setBuyers(buyerResponse.data);
      } catch (error) {
        console.error('Error fetching buyers:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('http://localhost:3001/api/catalog');
        setProducts(productResponse.data); // Store fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchBuyers();
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate form input
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

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

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const orderData = await sendRequest();
        alert('Order submitted successfully!');
        setFormData({ // Reset form data
          orderID: '',
          orderDate: '',
          quantity: 1,
          pid: '',
          buyer_id: '',
          status: 'Processing',
        });
        navigate('/admin/sales/manageorders', { state: { orderData } });
      } catch (error) {
        console.error('Error submitting order:', error.response?.data || error.message);
        alert('Error submitting order. Please try again.');
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  // Send request to server
  const sendRequest = async () => {
    return await axios.post('http://localhost:3001/api/orders', formData).then(res => res.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Order Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Information</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Order ID (Auto-generated)</label>
                <input
                  type="text"
                  name="orderID"
                  value={formData.orderID}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly // Order ID is auto-generated
                />
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
                  required
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product</label>
                <select
                  name="pid"
                  value={formData.pid}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.pid ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.pid} {/* Display the correct product ID (pid) */}
                    </option>
                  ))}
                </select>
                {errors.pid && <p className="text-red-500">{errors.pid}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Buyer</label>
                <select
                  name="buyer_id"
                  value={formData.buyer_id}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.buyer_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Buyer</option>
                  {buyers.map((buyer) => (
                    <option key={buyer._id} value={buyer._id}>
                      {buyer.fName} {buyer.lName}
                    </option>
                  ))}
                </select>
                {errors.buyer_id && <p className="text-red-500">{errors.buyer_id}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
