import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from '../../../services/axios.js';
import 'chart.js/auto';
import { Grid, Paper } from '@mui/material';

const TransportationsLogCharts = () => {
    const [transportLog, setTransportLog] = useState([]);

    useEffect(() => {
        const fetchTransportLog = async () => {
            try {
                const response = await axios.get('/transportLog/');
                if (response.data) {
                    setTransportLog(response.data);
                    console.log("Transport Log:", response.data);
                }
            } catch (error) {
                console.error('Error fetching transport log:', error);
            }
        };

        fetchTransportLog();
    }, []);

    // Pie Chart Data: Status Distribution
    const statusCounts = transportLog.reduce((acc, log) => {
        const status = log.status || 'Unknown'; // Handle null status
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                data: Object.values(statusCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Bar Chart Data: Completed, Upcoming, and Canceled Orders in the Past 10 Days
    const today = new Date();
    const pastTenDays = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    });

    // Helper function to get order count based on status
    const getOrderCount = (date, status) => {
        return transportLog.filter(log => {
            const logDate = log.date.split('T')[0]; // Extract date part
            return logDate === date && log.status === status;
        }).length;
    };

    const completedCounts = pastTenDays.map(date => getOrderCount(date, 'Completed'));
    const upcomingCounts = pastTenDays.map(date => getOrderCount(date, 'upcoming'));
    const canceledCounts = pastTenDays.map(date => getOrderCount(date, 'canceled'));

    const barChartData = {
        labels: pastTenDays.reverse(),
        datasets: [
            {
                label: 'Completed Orders',
                data: completedCounts.reverse(),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
            {
                label: 'Upcoming Orders',
                data: upcomingCounts.reverse(),
                backgroundColor: 'rgba(54,162,235,0.4)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
            },
            {
                label: 'Canceled Orders',
                data: canceledCounts.reverse(),
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Grid container spacing={2} >
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <h2>Status Distribution</h2>
                    <Pie data={pieChartData} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <h2>Orders in the Past 10 Days</h2>
                    <Bar data={barChartData} options={options} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TransportationsLogCharts;
