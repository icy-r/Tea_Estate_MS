import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Alert, Snackbar, Button } from '@mui/material'; // Importing MUI components
import jsPDF from 'jspdf'; // For generating PDFs

const OrderSupplies = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [supplyType, setSupplyType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [additionalConditions, setAdditionalConditions] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [orderDetails, setOrderDetails] = useState(null); // Store the placed order details

  // Fetch suppliers from the backend
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/supplier/'); // Adjust the endpoint as needed
      setSuppliers(response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching suppliers', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      supplierId: selectedSupplier,
      supplyType,
      quantity,
      additionalConditions,
    };

    try {
      const response = await axios.post('/orders/', orderData); // Adjust the endpoint as needed
      setOrderDetails(response.data); // Store the order details for PDF and view
      setAlert({ open: true, message: 'Order placed successfully!', severity: 'success' });
      // Reset the form fields
      setSelectedSupplier('');
      setSupplyType('');
      setQuantity('');
      setAdditionalConditions('');
    } catch (error) {
      setAlert({ open: true, message: 'Error placing the order!', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Function to print order details to a PDF
  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text('Order Details', 10, 10);
    doc.text(`Supplier: ${suppliers.find(s => s._id === selectedSupplier)?.companyName || 'N/A'}`, 10, 20);
    doc.text(`Supply Type: ${supplyType}`, 10, 30);
    doc.text(`Quantity: ${quantity}`, 10, 40);
    doc.text(`Additional Conditions: ${additionalConditions}`, 10, 50);
    doc.save('order-details.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Order Supplies</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
            Supplier
          </label>
          <select
            id="supplier"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.companyName} (Contact: {supplier.contactNum})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="supplyType" className="block text-sm font-medium text-gray-700">
            Supply Type
          </label>
          <select
            id="supplyType"
            value={supplyType}
            onChange={(e) => setSupplyType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="">Select a supply type</option>
            <option value="fertilizer">Fertilizer</option>
            <option value="chemicals">Chemicals</option>
            <option value="fuel">Fuel</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter quantity"
            required
          />
        </div>
        <div>
          <label htmlFor="additionalConditions" className="block text-sm font-medium text-gray-700">
            Additional Conditions
          </label>
          <textarea
            id="additionalConditions"
            value={additionalConditions}
            onChange={(e) => setAdditionalConditions(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter any additional conditions or notes"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="  w-30 py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 bg-center"
        >
          Order Supplies
        </button>
      </form>

      {/* View Sent Request Button */}
      {orderDetails && (
        <div className="mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert(JSON.stringify(orderDetails, null, 2))} // Simple alert for demo, could be a modal for better UX
          >
            View Sent Request
          </Button>
        </div>
      )}

    <center>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePrint} // Keep the same function for generating the PDF
        style={{ marginTop: '20px' }} // Set the top margin as per your request
      >
    Print Order
  </Button>
</center>

      {/* MUI Snackbar for Alerts */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderSupplies;
