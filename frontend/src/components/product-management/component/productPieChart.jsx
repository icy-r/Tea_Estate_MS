import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']; // Colors for the pie chart

const QualityPie = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Data for pie chart

  // Fetching catalogs from the API
  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/catalog/");
      console.log('API response:', response.data); // Log the response data to check
      setCatalogs(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchCatalogs once when the component mounts
  useEffect(() => {
    fetchCatalogs();
  }, []);

  // Calculate chart data based on catalogs
  const calculateChartData = (catalogs) => {
    // Count products by quality
    const qualityCount = catalogs.reduce((acc, catalog) => {
      const quality = catalog.quality || "Unknown"; // Default to "Unknown" if quality is not set
      acc[quality] = (acc[quality] || 0) + 1; // Increment count for the respective quality
      return acc;
    }, {});

    // Convert the count object into an array format suitable for the pie chart
    const data = Object.keys(qualityCount).map((quality) => ({
      name: quality,
      value: qualityCount[quality],
    }));

    console.log('Chart Data:', data); // Log chart data to check if it's correctly calculated
    setChartData(data);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* First Half of the Page */}
      <Box 
        display="flex" 
        flexDirection="column" 
        height="50vh" 
        p={3}
      >
       

        {/* Loading spinner */}
        {loading ? (
          <Box display="flex" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Conditionally render chart only if there is data */}
            {chartData.length > 0 ? (
              <Paper elevation={3} sx={{ mt: 4, p: 2, width: '100%', maxWidth: '600px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Tea Product Quality Distribution
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
            ) : (
              <Typography align="center" mt={2}>
                No data available for the chart
              </Typography>
            )}
          </>
        )}
      </Box>

     
    </Box>
  );
};

export default QualityPie;
