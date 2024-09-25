import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF8042']; // Colors for the pie chart

const FieldsHarvestChart = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Data for pie chart

  const fetchFieldsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/fields/");
      console.log("Fields data:", response.data); // Log response structure
      setFields(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error("Error fetching fields data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFieldsData();
  }, []);

  const calculateChartData = (fields) => {
    const data = fields.map((field) => ({
      name: field.field_name || field.name || "Unknown Field", // Check the correct attribute
      value: field.harvest_qnty || 0, // Directly using harvest_qnty for comparison
    }));

    setChartData(data);
  };

  const renderCustomizedLabel = ({ x, y, name, value }) => {
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${name}: ${value} kg`}
      </text>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Fields Harvest Comparison
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Harvest Quantity Distribution by Field
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel} // Add custom label
                labelLine={false} // Hide label lines for a cleaner look
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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

export default FieldsHarvestChart;
