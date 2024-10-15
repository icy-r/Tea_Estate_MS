import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Table, TableBody, TableCell, TableContainer,Rating, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const ViewOrders = ({ supplierid }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/");
      const filteredOrders = response.data.filter(order => order.supplierId === supplierid);
      setOrders(filteredOrders);
      console.log("Filtered Orders:", filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [supplierid]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        View Orders
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#15F5BA'}}>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Supply Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.supplyType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Rating
                        value={order.qualityRating || 0}
                        readOnly // Make it read-only for display
                        precision={0.5}
                        />
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found for this supplier.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewOrders;
