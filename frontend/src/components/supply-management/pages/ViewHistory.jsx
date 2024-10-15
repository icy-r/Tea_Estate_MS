import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Snackbar, Alert, Dialog,FormControl,InputLabel,Select, DialogActions, Rating, MenuItem, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin
import dayjs from 'dayjs'; // Import dayjs for date handling

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [supplierFilter, setSupplierFilter] = useState(''); // New state for supplier filtering
  const [statusFilter, setStatusFilter] = useState(''); // New state for status filtering
  const [startDate, setStartDate] = useState(null); // New state for start date
  const [endDate, setEndDate] = useState(null); // New state for end date

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/");
      setOrders(response.data);
      setFilteredOrders(response.data);
      console.log("Orders:", response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching order data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to filter orders based on search input and date range
  const handleSearch = () => {
    const filtered = orders.filter(order => {
      const companyName = order.supplierId || '';
      const supplyType = order.supplyType || '';
      const orderDate = dayjs(order.createdAt); // Use dayjs to create a date object
      const inDateRange =
        (!startDate || orderDate.isAfter(dayjs(startDate).subtract(1, 'day'))) && 
        (!endDate || orderDate.isBefore(dayjs(endDate).add(1, 'day')));

      return (
        (companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
          supplyType.toLowerCase().includes(searchInput.toLowerCase())) &&
        inDateRange
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
      const updatedOrder = { ...selectedOrder }; // Use selectedOrder directly
      await axios.put(`/orders/${selectedOrder._id}`, updatedOrder);
      setFilteredOrders(filteredOrders.map((order) => (order._id === selectedOrder._id ? updatedOrder : order)));
     
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
      order.supplierId || 'N/A',
      order.supplyType || 'N/A',
      order.quantity || 'N/A',
  
      order.status || 'N/A',
      order.createdAt,
      order.qualityRating || 'N/A' // Add qualityRating to the PDF table
    ]);
    
    doc.autoTable({
      head: [['Supplier', 'Supply Type', 'Quantity',  'Status', 'Quality Rating']],
      body: tableData,
      startY: 20,
    });

    doc.save("order_list.pdf");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Order Management</h1>
      <div className="mb-4 flex gap-2">
        <TextField
          label="Search by Supply Type"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
     
        {/* Using native Date handling, replace the DatePicker from date-fns with TextFields */}
        <TextField
          type="date"
          label="Start Date"
          variant="outlined"
          size="small"
          value={startDate ? dayjs(startDate).format('YYYY-MM-DD') : ''}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          variant="outlined"
          size="small"
          value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
          onChange={(e) => setEndDate(e.target.value)}
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
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Quality Rating</th> {/* New Column for Rating */}
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{order.supplierId || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.supplyType || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.quantity || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.createdAt || 'N/A'}</td>
                  <td className="py-2 px-4 border">{order.status || 'N/A'}</td>
                  <td className="py-2 px-4 border">
                    {/* Display the quality rating as stars */}
                    <Rating
                      value={order.qualityRating || 0}
                      readOnly // Make it read-only for display
                      precision={0.5}
                    />
                  </td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDialogOpen(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Button variant="contained" color="primary" onClick={generatePDF}>
        Generate PDF
      </Button>

      {/* Dialog for updating orders */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the order details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Supply Type"
            type="text"
            name="supplyType"
            value={selectedOrder?.supplyType || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            name="quantity"
            value={selectedOrder?.quantity || ''}
            onChange={handleChange}
            fullWidth
          />
        <FormControl fullWidth margin="dense">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            name="status"
            value={selectedOrder?.status || ''}
            onChange={handleChange}
            variant="outlined"
          >
           
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
            {/* Add more status options as needed */}
          </Select>
        </FormControl>
          <Rating
            name="qualityRating"
            value={selectedOrder?.qualityRating || 0}
            onChange={(event, newValue) => setSelectedOrder({ ...selectedOrder, qualityRating: newValue })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOrder} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>



      {/* Snackbar for alerts */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewOrders;
