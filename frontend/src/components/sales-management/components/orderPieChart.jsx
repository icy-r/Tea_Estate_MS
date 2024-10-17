import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, TextField } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']; // Colors for the pie chart

const OrderPie = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [chartData, setChartData] = useState([]); // Data for pie chart

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get("/orders/");
      setOrders(response.data);
      calculateChartData(response.data); // Calculate chart data
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate chart data for order status
  const calculateChartData = (orders) => {
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    setChartData(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order Status Distribution
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Pie Chart for Order Status */}
          <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Order Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search by Order ID, Product ID, or Buyer ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default OrderPie;
