import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManageVehicleGraph = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deptChartData, setDeptChartData] = useState([]); // Data for department bar chart

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/vehicles/");
      setVehicles(response.data);
      calculateDeptChartData(response.data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const calculateDeptChartData = (vehicles) => {
    const deptCounts = vehicles.reduce((acc, vehicle) => {
      acc[vehicle.assignedDept] = (acc[vehicle.assignedDept] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(deptCounts).map(department => ({
      name: department,
      value: deptCounts[department],
    }));

    setDeptChartData(data);
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
            Vehicles by Department
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1AACAC" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Box>
  );
};

export default ManageVehicleGraph;
