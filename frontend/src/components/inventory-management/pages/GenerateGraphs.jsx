import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F']; // Colors for the pie chart

const GenerateGraphs = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Data for pie chart

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/inventory/");
      setInventory(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const calculateChartData = (inventory) => {
    const fuel = inventory.filter(item => item.type === 'Fuel').length;
    const tea = inventory.filter(item => item.type === 'Tea').length;
    const fertilizer = inventory.filter(item => item.type === 'Fertilizer').length;
    const utilities = inventory.filter(item => item.type === 'Utilities').length;

    const data = [
      { name: 'Fuel', value: fuel },
      { name: 'Tea', value: tea },
      { name: 'Fertilizer', value: fertilizer },
      { name: 'Utilities', value: utilities },
    ];

    setChartData(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Inventory Overview
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Inventory Type Distribution
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

export default GenerateGraphs;
