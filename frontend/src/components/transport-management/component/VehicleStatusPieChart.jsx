import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#1AACAC', '#FA7070']; // Colors for the pie chart

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Data for pie chart

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/vehicles/");
      setVehicles(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const calculateChartData = (vehicles) => {
    const activeVehicles = vehicles.filter(vehicle => vehicle.status === 'Active').length;
    const maintenanceVehicles = vehicles.length - activeVehicles;

    const data = [
      { name: 'Active Vehicles', value: activeVehicles },
      { name: 'Maintenance Vehicles', value: maintenanceVehicles },
    ];

    setChartData(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h8" gutterBottom>
        Manage Vehicles
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={0} sx={{ mt: 4, p: 2 }}> {/* Set elevation to 0 */}
          <Typography variant="h5" align="center" gutterBottom>
            Vehicle Status Distribution
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

export default ManageVehicle;
