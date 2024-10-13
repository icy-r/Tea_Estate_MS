import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const api = {
    key: "ff4430d9c19fd39aeed0e8101e4bb890",
    base: "https://api.openweathermap.org/data/2.5/"
};

const DriverAnalytics = ({ vehicleId }) => {
    const [transportLog, setTransportLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageTime, setAverageTime] = useState(null);
    const [completedTasksPercentage, setCompletedTasksPercentage] = useState({ completed: 0, total: 0 });
    const [weather, setWeather] = useState({});
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const city = "Haputhale"; // Change this to the desired city or make it dynamic

    useEffect(() => {
        const fetchTransportLog = async () => {
            try {
                const response = await axios.get('/transportLog/');
                const filteredLogs = response.data.filter(log => log.vehicle_id === vehicleId);
                setTransportLog(filteredLogs);
                calculateAverageTime(filteredLogs);
                calculateCompletedTasksPercentage(filteredLogs);
            } catch (error) {
                console.error('Error fetching transport log:', error);
                setError('Failed to load transport logs.');
            } finally {
                setLoading(false);
            }
        };

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);
                const result = await response.json();
                setWeather(result);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeatherError('Failed to load weather data.');
            } finally {
                setWeatherLoading(false);
            }
        };

        if (vehicleId) {
            fetchTransportLog();
        }
        fetchWeatherData();
    }, [vehicleId]);

    const calculateAverageTime = (logs) => {
        const durations = logs.map(log => {
            if (log.startedTime && log.completedTime) {
                const start = new Date(log.startedTime);
                const end = new Date(log.completedTime);
                return (end - start) / 1000; // Duration in seconds
            }
            return 0; // Consider incomplete tasks as 0 duration
        }).filter(duration => duration > 0); // Exclude 0 duration entries

        if (durations.length > 0) {
            const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
            const average = totalDuration / durations.length; // Average duration in seconds
            setAverageTime(average);
        } else {
            setAverageTime(null);
        }
    };

    const calculateCompletedTasksPercentage = (logs) => {
        const completedTasks = logs.filter(log => log.completedTime).length; // Tasks that have been completed
        const totalTasks = logs.length; // Total tasks

        setCompletedTasksPercentage({
            completed: completedTasks,
            total: totalTasks
        });
    };

    if (loading) {
        return <p>Loading transport logs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Pie chart data
    const data = [
        { name: 'Completed', value: completedTasksPercentage.completed },
        { name: 'Pending', value: completedTasksPercentage.total - completedTasksPercentage.completed },
    ];

    return (
        <div className='pr-32 mt-10'>
            <Grid container spacing={2}>
                {/* First Row - Summary and Average Time */}
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Task Summary</Typography>
                                    <Typography variant="body1">Total Tasks: {completedTasksPercentage.total}</Typography>
                                    <Typography variant="body1">Completed Tasks: {completedTasksPercentage.completed}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
                                        <AccessTimeIcon style={{ marginRight: '8px' }} />
                                        Average Time Taken
                                    </Typography>
                                    {averageTime !== null ? (
                                        <Typography variant="body1">{Math.round(averageTime)} seconds</Typography>
                                    ) : (
                                        <Typography variant="body1">No valid tasks to calculate average time.</Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Row - Pie Chart */}
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Task Completion Status</Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                {data[0].value > 0 && (
                                    <PieChart width={200} height={280}>
                                        <Pie
                                            data={data}
                                            cx={100}
                                            cy={100}
                                            innerRadius={70}
                                            outerRadius={90}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#1AACAC' : '#FA7070'} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Third Row - Weather Data */}
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Current Weather</Typography>
                            {weatherLoading ? (
                                <Typography variant="body1">Loading weather data...</Typography>
                            ) : weatherError ? (
                                <Typography variant="body1">{weatherError}</Typography>
                            ) : (
                                <>
                                    <Typography variant="body1">{weather.name}</Typography>
                                    <Typography variant="body1">{weather.main?.temp}°C</Typography>
                                    <Typography variant="body1">{weather.weather[0]?.main} ({weather.weather[0]?.description})</Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Fourth Row - Additional Graph (Placeholder) */}
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Additional Graph</Typography>
                            <Typography variant="body1">Graph Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default DriverAnalytics;
