import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']; // Colors for the pie chart

const SupplierPie = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Data for pie chart

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/suppliers/");
      setSuppliers(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const calculateChartData = (suppliers) => {
    // Count suppliers by supplyType
    const supplyTypeCount = suppliers.reduce((acc, supplier) => {
      const supplyType = supplier.supplyType || "Unknown"; // Default to "Unknown" if supplyType is not set
      acc[supplyType] = (acc[supplyType] || 0) + 1; // Increment count for the respective supplyType
      return acc;
    }, {});

    // Convert the count object into an array format suitable for the pie chart
    const data = Object.keys(supplyTypeCount).map((type) => ({
      name: type,
      value: supplyTypeCount[type],
    }));

    setChartData(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Suppliers
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Supplier Type Distribution
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
      )}
    </Box>
  );
};

export default SupplierPie;
