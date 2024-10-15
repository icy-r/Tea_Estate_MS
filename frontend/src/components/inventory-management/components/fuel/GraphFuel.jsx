import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

const GraphFuel = () => {
    const [fuelData, setFuelData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFuelData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/fuel/"); // Adjust endpoint if needed
            const fuelCollection = response.data;
            calculateFuelData(fuelCollection);
        } catch (error) {
            console.error("Error fetching fuel data:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateFuelData = (fuelCollection) => {
        const fuelTypes = ['Gasoline', 'Diesel', 'Kerosene', 'LPG']; // Adjust with actual fuel types
        const data = fuelTypes.map(type => ({
            name: type,
            value: fuelCollection.filter(fuel => fuel.fuelType === type).reduce((acc, fuel) => acc + fuel.quantityInStock, 0), // Sum the quantities
        }));
        setFuelData(data);
    };

    useEffect(() => {
        fetchFuelData();
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
                        Fuel Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={fuelData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {fuelData.map((entry, index) => (
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

export default GraphFuel;
