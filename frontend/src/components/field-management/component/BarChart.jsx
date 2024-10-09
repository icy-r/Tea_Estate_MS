import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LabourHarvestChart = () => {
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labourChartData, setLabourChartData] = useState([]);

  // Fetch labour data for bar chart
  const fetchLaboursData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/labours/");
      console.log("Labours data:", response.data); // Log response structure
      setLabours(response.data);
      filterAndCalculateLabourChartData(response.data);
    } catch (error) {
      console.error("Error fetching labours data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboursData();
  }, []);

  // Filter labours by role and calculate chart data
  const filterAndCalculateLabourChartData = (labours) => {
    const filteredLabours = labours.filter(
      (labour) => labour.role === "Labour"
    );

    const data = filteredLabours.map((labour) => ({
      name: `${labour.firstName} ${labour.lastName}`,
      harvest_qnty: labour.harvest_qnty || 0,
      best_qnty: labour.best_qnty || 0,
      good_qnty: labour.good_qnty || 0,
      damaged_qnty: labour.damaged_qnty || 0,
    }));
    setLabourChartData(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Labour Harvest Performance
      </Typography>

      {/* Loading spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Bar Chart for Labour Harvest Performance */}
          <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Labour Harvest Details
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={labourChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="best_qnty"
                  fill="#00C49F"
                  name="Best Quality Harvest"
                />
                <Bar
                  dataKey="good_qnty"
                  fill="#FFBB28"
                  name="Good Quality Harvest"
                />
                <Bar
                  dataKey="damaged_qnty"
                  fill="#FF8042"
                  name="Damaged Harvest"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default LabourHarvestChart;
