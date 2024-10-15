// ManageSupplier.js
import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';

import {
  Snackbar,
  Alert
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from 'recharts';

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Fetch all suppliers from the backend
  const fetchDetails = async () => {
    try {
      const response = await axios.get("/supplier/");
      setSuppliers(response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching supplier data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // Data processing for charts
  const supplyTypeData = suppliers.reduce((acc, supplier) => {
    const type = supplier.supplyType; // Adjust this field as necessary based on your supplier data
    acc[type] = acc[type] ? acc[type] + 1 : 1;
    return acc;
  }, {});

  const data = Object.entries(supplyTypeData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF1493'];

  // Pie Chart Component
  const SupplyTypePieChart = () => (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );

  // Bar Chart Component
  const SupplyTypeBarChart = () => (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <RechartsTooltip />
      <RechartsLegend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold ">Supply Type Distribution</h1>

      {/* Flex container to align charts side by side */}
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl mb-2 mt-24">Pie Chart</h2>
          <SupplyTypePieChart /> {/* Pie Chart */}
        </div>
        
        <div>
          <h2 className="text-xl mb-2 mt-24">Bar Chart</h2>
          <SupplyTypeBarChart /> {/* Bar Chart */}
        </div>
      </div>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageSupplier;
