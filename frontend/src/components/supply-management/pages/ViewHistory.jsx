import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigateTo = useNavigate();

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching order data', severity: 'error' });
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to filter orders based on search input
  const handleSearch = () => {
    const filtered = orders.filter(order => {
      const companyName = order.supplierId?.companyName || '';
      const supplyType = order.supplyType || '';
      return (
        companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
        supplyType.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  };
  
  const handleDialogOpen = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/orders/${id}`);
      setFilteredOrders(filteredOrders.filter((order) => order._id !== id));
      setAlert({ open: true, message: 'Order deleted successfully', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: 'Error deleting order', severity: 'error' });
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/orders/${selectedOrder._id}`, selectedOrder);
      setFilteredOrders(filteredOrders.map((order) => (order._id === selectedOrder._id ? selectedOrder : order)));
      setAlert({ open: true, message: 'Order updated successfully', severity: 'success' });
      handleDialogClose();
    } catch (error) {
      setAlert({ open: true, message: 'Error updating order', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({ ...selectedOrder, [name]: value });
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order List", 14, 16);
    
    const tableData = filteredOrders.map(order => [
      order.supplierId?.companyName || 'N/A',
      order.supplyType || 'N/A',
      order.quantity || 'N/A',
      order.additionalConditions || 'N/A'
    ]);
    
    doc.autoTable({
      head: [['Supplier', 'Supply Type', 'Quantity', 'Additional Conditions']],
      body: tableData,
      startY: 20,
    });

    doc.save("order_list.pdf");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Order Management</h1>

      <div className="mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" color="primary" size="small" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Supplier</th>
              <th className="py-2 px-4 text-left">Supply Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Additional Conditions</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{order.supplierId}</td>
                  <td className="py-2 px-4 border">{order.supplyType || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.quantity || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.additionalConditions || 'N/A'}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    {/* Update Button */}
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDialogOpen(order)}
                    >
                      Update
                    </button>
                    {/* Delete Button */}
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
                <td colSpan="5" className="text-center py-4">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <center>
        {/* Generate PDF Button */}
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-md"
          style={{ marginTop: '20px' }}
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </center>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the order details below.</DialogContentText>
          {selectedOrder && (
            <>
              <TextField
                margin="dense"
                name="supplyType"
                label="Supply Type"
                type="text"
                fullWidth
                value={selectedOrder.supplyType}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={selectedOrder.quantity}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="additionalConditions"
                label="Additional Conditions"
                type="text"
                fullWidth
                value={selectedOrder.additionalConditions}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateOrder}>Update</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewOrders;
