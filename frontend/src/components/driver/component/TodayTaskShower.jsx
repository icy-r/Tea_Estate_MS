import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Tooltip,
} from '@mui/material';
import moment from 'moment'; // To format the time

const ViewTodayTasks = ({ driverId, weatherData }) => {
   console.log('weatherData:', weatherData);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [todayTransportLogs, setTodayTransportLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    if (driverId) {
      fetchVehicleDetails(driverId);
    }
  }, [driverId]);

  const fetchVehicleDetails = async (id) => {
    setLoading(true);
    try {
      const driverResponse = await axios.get(`/drivers/${id}`);
      const vehicleId = driverResponse.data.vehicle_id;

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data[0]);

      const transportLogResponse = await axios.get('/transportLog/');
      const todayLogs = transportLogResponse.data.filter((log) =>
        moment(log.date).isSame(moment(), 'day') && log.vehicle_id === vehicleResponse.data[0].id
      );

      setTodayTransportLogs(todayLogs);

      setAlert({ open: true, message: 'Driver-Vehicle details fetched successfully!', severity: 'success' });
    } catch (error) {
      setVehicleDetails(null);
      setAlert({ open: true, message: 'Vehicle not found or error fetching details.', severity: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));
      }, 3000);
    }
  };

  const calculateRemainingTime = (logTime, logDate) => {
    const currentTime = moment();
    const scheduledTime = moment(`${logDate} ${logTime}`, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(scheduledTime.diff(currentTime));

    if (duration.asMilliseconds() <= 0) {
      return 'Time expired';
    }
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      let updateData = { status: newStatus };
      if (newStatus === 'Trip Started') {
        updateData.startedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      } else if (newStatus === 'Completed') {
        updateData.completedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      }
      await axios.put(`/transportLog/${id}`, updateData);
      setAlert({ open: true, message: `Status updated to ${newStatus}!`, severity: 'success' });

      setTodayTransportLogs((prevLogs) =>
        prevLogs.map((log) =>
          log._id === id ? { ...log, status: newStatus, ...updateData } : log
        )
      );
    } catch (error) {
      setAlert({ open: true, message: 'Error updating status.', severity: 'error' });
    } finally {
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));
      }, 3000);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Today's Tasks</Typography>
      {loading ? (
        <CircularProgress />
      ) : vehicleDetails ? (
        <div>
          {todayTransportLogs.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#15F5BA' }}>
                    <TableCell>Route ID</TableCell>
                    
                    <TableCell>Scheduled Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Weather</TableCell>
                    <TableCell>Remaining Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time Spent</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayTransportLogs.map((log) => {
                    const routeDetails = log.routeDetails; // Adjusted to directly use log data

                    return (
                      <TableRow key={log._id}>
                        <TableCell>{log.route_id}</TableCell>
                        <TableCell>{moment(log.date).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{log.time}</TableCell>
                        <TableCell>{weatherData.weather[0]?.description}

                                        {weatherData.weather[0]?.icon && (
                                            <img
                                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`} // Increased size of the image
                                                alt="Weather icon"
                                                style={{ width: '25%', height: 'auto' }} // Adjust the size as needed
                                            />
                                        )}
                        </TableCell>
                        <TableCell>{calculateRemainingTime(log.time, moment(log.date).format('YYYY-MM-DD'))}</TableCell>
                        <TableCell>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              color: '#fff',
                              backgroundColor:
                                log.status === 'upcoming'
                                  ? '#FFA500'
                                  : log.status === 'Trip Started'
                                  ? '#1E90FF'
                                  : log.status === 'Completed'
                                  ? '#28A745'
                                  : '#6C757D',
                            }}
                          >
                            {log.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.startedTime && log.completedTime ? (
                            moment(log.completedTime).diff(moment(log.startedTime), 'minutes') + ' minutes'
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          {log.status === 'upcoming' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateStatus(log._id, 'Trip Started')}
                            >
                              Start Trip
                            </Button>
                          ) : log.status === 'Trip Started' ? (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleUpdateStatus(log._id, 'Completed')}
                            >
                              Complete Trip
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="secondary"
                              disabled
                            >
                              Trip Completed
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No tasks scheduled for today.</Typography>
          )}
        </div>
      ) : (
        <Typography variant="body1">No vehicle details available.</Typography>
      )}
    </div>
  );
};

export default ViewTodayTasks;
