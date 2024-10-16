import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { 
  Snackbar, 
  Alert, 
  Dialog, 
  FormControl, 
  InputLabel, 
  Select, 
  DialogActions, 
  Rating, 
  MenuItem, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Button, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper
} from '@mui/material';
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
      const response = await axios.get("/ordersSup/");
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
      await axios.delete(`/ordersSup/${id}`);
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
      head: [['Supplier', 'Supply Type', 'Quantity', 'Status', 'Quality Rating']],
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

        <Button variant="contained" color="primary"  size="small" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#15F5BA' }}>
              <TableCell>Supplier</TableCell>
              <TableCell>Supply Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quality Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell>{order.supplierId || 'N/A'}</TableCell>
                  <TableCell>{order.supplyType || 'N/A'}</TableCell>
                  <TableCell>{order.quantity || 'N/A'}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD') || 'N/A'}</TableCell>
                  <TableCell>{order.status || 'N/A'}</TableCell>
                  <TableCell>
                    <Rating
                      value={order.qualityRating || 0}
                      readOnly
                      precision={0.5}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ bgcolor: '#15F5BA' , color: 'black' }}
                      onClick={() => handleDialogOpen(order)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ bgcolor: '#FA7070', color: 'black' }}
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" color="primary" onClick={generatePDF}>
        Generate PDF
      </Button>

      {/* Dialog for updating orders */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the order details.</DialogContentText>
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
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={selectedOrder?.status || ''}
              onChange={handleChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Quality Rating</InputLabel>
            <Rating
              name="qualityRating"
              value={selectedOrder?.qualityRating || 0}
              onChange={(event, newValue) => {
                setSelectedOrder({ ...selectedOrder, qualityRating: newValue });
              }}
              precision={0.5}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOrder} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewOrders;
