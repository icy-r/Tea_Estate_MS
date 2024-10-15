import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

// Sample data for the tea prices in different markets
const teaPriceData = [
  {
    market: 'USA',
    BOPPrice: 470, // Example price for BOP in Rs/kg
    BOPFPrice: 450 // Example price for BOPF in Rs/kg
  },
  {
    market: 'Coimbatore',
    BOPPrice: 350, // Example price for BOP in Rs/kg
    BOPFPrice: 340 // Example price for BOPF in Rs/kg
  },
  {
    market: 'Coonoor',
    BOPPrice: 300, // Example price for BOP in Rs/kg
    BOPFPrice: 290 // Example price for BOPF in Rs/kg
  }
];

const TeaPriceBarGraph = () => {
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" align='center' gutterBottom>
              BOP/BOPF Tea Prices by Market (Rs/kg)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={teaPriceData}>
                {/* Grid lines */}
                <CartesianGrid strokeDasharray="3 3" />
                {/* X-axis for market names */}
                <XAxis dataKey="market" label={{ value: 'Market', position: 'insideBottom', offset: -5 }} />
                {/* Y-axis for price */}
                <YAxis label={{ value: 'Price (Rs/kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {/* Bars for BOP and BOPF prices */}
                <Bar dataKey="BOPPrice" fill="#8884d8" name="BOP Price" barSize={40} />
                <Bar dataKey="BOPFPrice" fill="#82ca9d" name="BOPF Price" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeaPriceBarGraph;
