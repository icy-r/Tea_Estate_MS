import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js'; // Adjust your axios setup

const AddAuction = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    auID: '',
    date: '',
    productID: '',
    buyer_id: [],
    status: '',
    meetingLink: 'https://us05web.zoom.us/j/89246140524?pwd=55Vb5cCr6EJtarp25c0xn7YrVzzauf.1', // Default meeting link
  });

  const [errors, setErrors] = useState({});
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all buyers and products on component mount
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

    if (!formData.auID) {
      tempErrors.auID = 'Auction ID is required';
      isValid = false;
    }
    if (!formData.date) {
      tempErrors.date = 'Auction date is required';
      isValid = false;
    }
    if (!formData.productID) {
      tempErrors.productID = 'Product ID is required';
      isValid = false;
    }
    if (!formData.buyer_id || formData.buyer_id.length === 0) {
      tempErrors.buyer_id = 'Buyer ID is required';
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
      try {
        await sendRequest();
        alert('Auction submitted successfully!');
        navigate('/admin/sales/manageauctions'); // Navigate to ManageAuctions after successful submission
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message); // Log error details
        alert('Error submitting auction. Please try again.');
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  // Send request to the server
  const sendRequest = async () => {
    return await axios.post("http://localhost:3001/api/auction", formData).then(res => res.data);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center">Create Auction</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Auction Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Auction Information</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Auction ID</label>
                <input
                  type="text"
                  name="auID"
                  value={formData.auID}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.auID ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.auID && <p className="text-red-500">{errors.auID}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Auction Date</label>
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

            {/* Product and Buyer Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Product & Buyer Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Product</label>
                <select
                  name="productID"
                  value={formData.productID}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.productID ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.pid} {/* Display the correct product ID (pid) */}
                    </option>
                  ))}
                </select>
                {errors.productID && <p className="text-red-500">{errors.productID}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Buyer</label>
                <select
                  name="buyer_id"
                  value={formData.buyer_id}
                  onChange={(e) => setFormData({ ...formData, buyer_id: [e.target.value] })}
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
                  className={`w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && <p className="text-red-500">{errors.status}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
              Submit Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuction;
