import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const GraphUtilities = () => {
    const [utilitiesData, setUtilitiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUtilitiesData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/utilities/"); // Adjust the endpoint as necessary
            const utilitiesCollection = response.data;
            calculateUtilitiesData(utilitiesCollection);
        } catch (error) {
            console.error("Error fetching utilities data:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateUtilitiesData = (utilitiesCollection) => {
        const utilityTypes = [...new Set(utilitiesCollection.map(utility => utility.utilityType))];
        const data = utilityTypes.map(type => ({
            name: type,
            value: utilitiesCollection.filter(utility => utility.utilityType === type).length,
        }));
        setUtilitiesData(data);
    };

    useEffect(() => {
        fetchUtilitiesData();
    }, []);

    return (
        <Box p={3}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Utilities Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={utilitiesData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {utilitiesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default GraphUtilities;
