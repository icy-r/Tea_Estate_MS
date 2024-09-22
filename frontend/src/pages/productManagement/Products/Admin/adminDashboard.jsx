import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Dummy data for pie chart (Last week's product view summary)
const data = [
  { name: 'BOP', value: 400 },
  { name: 'BOPF', value: 300 },
  { name: 'FBOP', value: 300 },
];
const COLORS = ['#FF6B6B', '#26C6DA', '#00C49F'];

const AdminDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Cards for stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1">Products Listed</Typography>
              <Typography variant="h4">39</Typography>
              <Box mt={1} height={4} bgcolor="#26C6DA" width="50%" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1">Products Viewed</Typography>
              <Typography variant="h4">150</Typography>
              <Box mt={1} height={4} bgcolor="#FF6B6B" width="60%" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1">New Registrations</Typography>
              <Typography variant="h4">15</Typography>
              <Box mt={1} height={4} bgcolor="#00C49F" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product View Summary and Important Notices */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} sm={7}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Last Week Product View Summary</Typography>
              <Typography variant="body2" mt={1}>Most Viewed Products by Category</Typography>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx={150}
                  cy={150}
                  outerRadius={100}
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Important Notices</Typography>
              <Divider sx={{ my: 2 }} />

              {/* Inventory Manager Notice */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: '#00C49F', marginRight: 2 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="bold">Inventory Manager</Typography>
                  <Typography variant="body2">Inventory Report (15/05/2024)</Typography>
                  <Typography variant="caption" color="primary">ACTION</Typography>
                </Box>
              </Box>

              {/* Sales Manager Notice */}
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: '#26C6DA', marginRight: 2 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="bold">Sales Manager</Typography>
                  <Typography variant="body2">Auction Starting Times BOP - 16/05/2024 16:30</Typography>
                  <Typography variant="caption" color="primary">ACTION</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
