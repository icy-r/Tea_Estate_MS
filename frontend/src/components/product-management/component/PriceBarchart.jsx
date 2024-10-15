import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh ">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
              <Typography variant="h5" align='center' gutterBottom>
                Unit Price of Tea by Quality
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="quality" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="unitPrice" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* You can add another Grid item here for additional content in the second half of the page */}
          <Grid item xs={12} sm={6}>
            {/* Other content can go here */}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UnitPriceBarGraph;
