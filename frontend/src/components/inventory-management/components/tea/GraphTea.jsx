import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const GraphTea = () => {
    const [teaData, setTeaData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTeaData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/tea/");
            const teaCollection = response.data;
            calculateTeaData(teaCollection);
        } catch (error) {
            console.error("Error fetching tea data:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTeaData = (teaCollection) => {
        const teaTypes = ['BlackTea', 'GreenTea', 'WhiteTea', 'HerbalTea'];
        const data = teaTypes.map(type => ({
            name: type,
            value: teaCollection.filter(tea => tea.teaName === type).length,
        }));
        setTeaData(data);
    };

    useEffect(() => {
        fetchTeaData();
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
                        Tea Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={teaData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {teaData.map((entry, index) => (
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

export default GraphTea;
