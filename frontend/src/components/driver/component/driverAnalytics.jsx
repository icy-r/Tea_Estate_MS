import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import { PieChart, Pie, Cell, Tooltip, Legend,LineChart,Line, YAxis,XAxis } from 'recharts';
import { Card, CardContent, Typography, Grid,LinearProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ViewTodayTasks from "./TodayTaskShower.jsx";

const api = {
    key: "ff4430d9c19fd39aeed0e8101e4bb890",
    base: "https://api.openweathermap.org/data/2.5/"
};


const DriverAnalytics = ({ vehicleId, driverId }) => {
    const [transportLog, setTransportLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [driverQuality, setDriverQuality] = useState(0);
    const [averageTime, setAverageTime] = useState(null);
    const [completedTasksPercentage, setCompletedTasksPercentage] = useState({ completed: 0, total: 0 });
    const [weather, setWeather] = useState({});
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const city = "Haputhale"; // Change this to the desired city or make it dynamic

    const calculateDriverQuality = (logs) => {
        const totalTasks = logs.length;
        if (totalTasks === 0) return 0;
    
        // Tasks that were completed
        const completedTasks = logs.filter(log => log.completedTime).length;
    
        // Timely tasks: Assuming "timely" means completed within 1 hour
        const timelyTasks = logs.filter(log => {
            if (log.startedTime && log.completedTime) {
                const duration = new Date(log.completedTime) - new Date(log.startedTime);
                return duration <= 3600000; // 1 hour in milliseconds
            }
            return false;
        }).length;
    
        // Calculate completion rate
        const completionRate = (completedTasks / totalTasks) * 100;
    
        // Timeliness score: percentage of tasks completed within 1 hour
        const timelinessScore = (timelyTasks / totalTasks) * 100;
    
        // Average time per task in minutes (only for completed tasks)
        const durations = logs.map(log => {
            if (log.startedTime && log.completedTime) {
                const start = new Date(log.startedTime);
                const end = new Date(log.completedTime);
                return (end - start) / 1000 / 60; // Duration in minutes
            }
            return 0;
        }).filter(duration => duration > 0);
    
        const averageTime = durations.length > 0 ? durations.reduce((acc, curr) => acc + curr, 0) / durations.length : 0;
    
        // Driver quality score: You can adjust the weight of each factor depending on its importance
        const qualityScore = (timelinessScore * 0.4) + (completionRate * 0.4) + (100 / averageTime * 0.2); // Example weight: 40% timeliness, 40% completion, 20% average time
    
        console.log('Quality score:', qualityScore);
        setDriverQuality(qualityScore);
        return qualityScore;
    };


    useEffect(() => {
        const fetchTransportLog = async () => {
            try {
                const response = await axios.get('/transportLog/');
                const filteredLogs = response.data.filter(log => log.vehicle_id === vehicleId);
                setFilteredLogs(filteredLogs);
                setTransportLog(filteredLogs);
                calculateAverageTime(filteredLogs);
                calculateCompletedTasksPercentage(filteredLogs);
                calculateDriverQuality(filteredLogs);
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
                console.log('Weather data:', result);
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
            console.log('Average time:', average);
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

    // Data for the time utilization chart
    const timeUtilizationData = transportLog
        .slice(-10) // Get the last 10 tasks
        .map(log => {
            if (log.startedTime && log.completedTime) {
                const start = new Date(log.startedTime);
                const end = new Date(log.completedTime);
                return {
                    name: log.taskName || `Task ${transportLog.length - transportLog.indexOf(log)}`, // Use task name or index as a placeholder
                    duration: (end - start) / 1000 / 60, // Duration in minutes
                };
            }
            return null; // Skip incomplete tasks
        })
        .filter(task => task !== null); // Filter out null entries
       
   
    return (
        <div className='px-10 mt-10'>
            <ViewTodayTasks driverId={driverId} weatherData={weather} />

            <Grid container spacing={2} sx={{marginTop:10}}>
                {/* First Row - Summary and Average Time */}
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                        <Card
                            sx={{
                                backgroundColor: '#f5f5f5', // Light gray background color
                                borderRadius: '10px', // Rounded corners
                                boxShadow: 3, // Adding some shadow for depth
                                '&:hover': {
                                    backgroundColor: '#1AACAC', // Darker shade on hover
                                    transform: 'scale(1.02)', // Slightly enlarge on hover
                                    transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
                                },
                                padding: 2 // Adding padding
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Task Summary</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>Total Tasks: {completedTasksPercentage.total}</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>Completed Tasks: {completedTasksPercentage.completed}</Typography>
                            </CardContent>
                        </Card>
                     </Grid>
                        <Grid item>
                        <Card
                            sx={{
                                backgroundColor: '#f5f5f5', // Light gray background color
                                borderRadius: '10px', // Rounded corners
                                height: '200px', // Full height
                                boxShadow: 3, // Adding shadow for depth
                                '&:hover': {
                                    backgroundColor: '#e0e0e0', // Darker shade on hover
                                    transform: 'scale(1.02)', // Slightly enlarge on hover
                                    transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
                                },
                                padding: 2 // Adding padding
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                                    <AccessTimeIcon style={{ marginRight: '8px', color: '#1AACAC' }} /> {/* Custom icon color */}
                                    Average Time Taken
                                </Typography>
                                {averageTime !== null ? (
                                    <Typography variant="body1" sx={{ color: '#555' }}>
                                        {Math.floor(averageTime / 3600)} hours {Math.floor((averageTime % 3600) / 60)} minutes
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" sx={{ color: '#555' }}>No valid tasks to calculate average time.</Typography>
                                )}
                            </CardContent>
                            
                        </Card>
                        </Grid>
                    </Grid>
                </Grid>

               
              
                {/* Third Row - Weather Data */}
                <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#fff', boxShadow: 3, borderRadius: 2, 
                    '&:hover': {
                                    backgroundColor: '#e0e0e0', // Darker shade on hover
                                    transform: 'scale(1.02)', // Slightly enlarge on hover
                                    transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
                                },
                    
                    padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Current Weather</Typography>
                            
                            {weatherLoading ? (
                                <Typography variant="body1" sx={{ color: '#888' }}>Loading weather data...</Typography>
                            ) : weatherError ? (
                                <Typography variant="body1" sx={{ color: 'red' }}>{weatherError}</Typography>
                            ) : (
                                <Grid container spacing={2}>
                                    {/* Left side for weather details */}
                                    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{weather.name}</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 0.5 }}>{weather.main?.temp}°C</Typography>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                            {weather.weather[0]?.main} ({weather.weather[0]?.description})
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginTop: 1 }}>Wind Speed: {weather.wind?.speed} m/s</Typography>
                                    </Grid>

                                    {/* Right side for weather icon */}
                                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {weather.weather[0]?.icon && (
                                            <img
                                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} // Increased size of the image
                                                alt="Weather icon"
                                                style={{ width: '70%', height: 'auto', borderRadius: '8px' }} // Rounded corners for the image
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>

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


                {/* Fourth Row - Additional Graph (Placeholder) */}
                <Grid item xs={12} sm={8}>
                    <Card sx={{ backgroundColor: '#fff', boxShadow: 3, borderRadius: 2, padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Time Utilization of Last 10 Tasks</Typography>
                            {timeUtilizationData.length > 0 ? (
                                <LineChart width={700} height={200} data={timeUtilizationData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="duration" stroke="#0D294D" activeDot={{ r: 8 }} />
                                </LineChart>
                            ) : (
                                <Typography variant="body1" sx={{ color: '#555' }}>No data available.</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ padding: 2, marginTop: 2 }}>
                            <CardContent>
                                <Typography variant="h6">Driver Quality</Typography>
                                
                                <LinearProgress variant="determinate" value={driverQuality} />
                                <Typography variant="body1" sx={{ marginTop: 1, fontWeight: 'bold' }}>{driverQuality.toFixed(2)}%</Typography>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default DriverAnalytics;
