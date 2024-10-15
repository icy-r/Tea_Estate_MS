import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const GraphFert = () => {
    const [fertData, setFertData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFertData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/fert/"); // Ensure this endpoint is correct
            const fertCollection = response.data;
            calculateFertData(fertCollection);
        } catch (error) {
            console.error("Error fetching fertilizer data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateFertData = (fertCollection) => {
        const fertilizerTypes = [...new Set(fertCollection.map(fert => fert.fertilizerType))];
        const data = fertilizerTypes.map(type => ({
            name: type,
            value: fertCollection.filter(fert => fert.fertilizerType === type).length,
        }));
        setFertData(data);
    };

    useEffect(() => {
        fetchFertData();
    }, []);

    return (
        <Box p={3}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Error fetching fertilizer data
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Fertilizer Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={fertData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {fertData.map((entry, index) => (
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


export default GraphFert;
