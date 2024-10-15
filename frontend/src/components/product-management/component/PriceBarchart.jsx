import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const UnitPriceBarGraph = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  // Fetching catalogs from the API
  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/catalog/");
      console.log('API response:', response.data);
      setCatalogs(response.data);
      prepareChartData(response.data);
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

  // Prepare chart data based on catalogs
  const prepareChartData = (catalogs) => {
    const data = catalogs.map(catalog => ({
      quality: catalog.quality || "Unknown", // Default to "Unknown" if quality is not set
      unitPrice: parseFloat(catalog.unitPrice) || 0, // Parse unit price as a float
      aucDate: catalog.aucDate ? new Date(catalog.aucDate).toLocaleDateString() : "Unknown" // Format the auction date
    }));

    // Group data by quality and date, summing the unit prices
    const groupedData = data.reduce((acc, curr) => {
      const key = `${curr.quality}-${curr.aucDate}`;
      if (!acc[key]) {
        acc[key] = { quality: curr.quality, aucDate: curr.aucDate, totalUnitPrice: 0 };
      }
      acc[key].totalUnitPrice += curr.unitPrice;
      return acc;
    }, {});

    // Convert the grouped data back to an array
    const chartArray = Object.values(groupedData).map(item => ({
      quality: item.quality,
      aucDate: item.aucDate,
      unitPrice: item.totalUnitPrice,
    }));

    console.log('Chart Data:', chartArray);
    setChartData(chartArray);
  };

  return (
    <Box p={3}>
      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ mt: 4, p: 2, maxWidth: '80%', margin: '0 auto' }}> {/* Increase maxWidth and center the card */}
              <Typography variant="h5" align='center' gutterBottom>
                Unit Price of Tea by Quality
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  {/* Adding grid lines */}
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* X-axis with label */}
                  <XAxis dataKey="quality" label={{ value: 'Tea Quality', position: 'insideBottom', offset: -5 }} />
                  {/* Y-axis with label */}
                  <YAxis label={{ value: 'Unit Price (in Rs.)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`Rs. ${value.toFixed(2)}`, 'Unit Price']} />
                  <Legend />
                  {/* Gradient color for bars */}
                  <Bar dataKey="unitPrice" fill="url(#colorUv)" barSize={40} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UnitPriceBarGraph;
