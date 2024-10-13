import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button } from '@mui/material';
import moment from 'moment'; // To format the time

const ViewTodayTasks = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [todayTransportLogs, setTodayTransportLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    if (driverId) {
      fetchVehicleDetails(driverId);
    }
  }, [driverId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTodayTransportLogs((prevLogs) => [...prevLogs]); // Re-trigger state update every second
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const fetchVehicleDetails = async (id) => {
    setLoading(true);
    try {
      const driverResponse = await axios.get(`/drivers/${id}`);
      const vehicleId = driverResponse.data.vehicle_id;

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data[0]);
      console.log('Vehicle details:', vehicleResponse.data);

      const transportLogResponse = await axios.get('/transportLog/');
      const todayLogs = transportLogResponse.data.filter((log) => 
        moment(log.date).isSame(moment(), 'day') && log.vehicle_id === vehicleResponse.data[0].id
      );
      setTodayTransportLogs(todayLogs);
      console.log('Today’s transport log:', todayLogs);

      setAlert({ open: true, message: 'Driver-Vehicle details fetched successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      setVehicleDetails(null);
      setAlert({ open: true, message: 'Vehicle not found or error fetching details.', severity: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));
      }, 3000);
    }
  };

  // Function to calculate remaining time
  const calculateRemainingTime = (logTime, logDate) => {
    const currentTime = moment();

    const logtime = moment(logDate + logTime, "YYYY-MM-DD HH:mm");
    const scheduledTime = moment(logtime);
    const duration = moment.duration(scheduledTime.diff(currentTime));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (duration.asMilliseconds() <= 0) {
      return 'Time expired';
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Function to update the status of a transport log and handle timestamps
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      let updateData = { status: newStatus };

      // If journey starts, add startedTime, if journey ends, add completedTime
      if (newStatus === 'Trip Started') {
        updateData.startedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      } else if (newStatus === 'Completed') {
        updateData.completedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      }

      await axios.put(`/transportLog/${id}`, updateData);
      setAlert({ open: true, message: `Status updated to ${newStatus}!`, severity: 'success' });

      // Update the transport log state after successful update
      setTodayTransportLogs((prevLogs) =>
        prevLogs.map((log) =>
          log._id === id
            ? { ...log, status: newStatus, ...updateData }
            : log
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
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
          {/* Display today's transport log details */}
          {todayTransportLogs.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#15F5BA'}} >
                    <TableCell>Route ID</TableCell>
                    <TableCell>Scheduled Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Remaining Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time Spend</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayTransportLogs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell>{log.route_id}</TableCell>
                      <TableCell>{moment(log.date).format('YYYY-MM-DD')}</TableCell>
                      <TableCell>{log.time}</TableCell>
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
                              ? '#FFA500' // Orange for upcoming
                              : log.status === 'Trip Started'
                              ? '#1E90FF' // Blue for Trip Started
                              : log.status === 'Completed'
                              ? '#28A745' // Green for Completed
                              : '#6C757D', // Grey for any other status
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
                            style={{ marginRight: '8px' }}
                          >
                            Start the Journey
                          </Button>
                        ) : log.status === 'Trip Started' ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleUpdateStatus(log._id, 'Completed')}
                          >
                            End Trip
                          </Button>
                        ) : (
                          <Typography variant="body2">Trip Completed</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No transport logs for today.</Typography>
          )}
        </div>
      ) : (
        <Typography>No vehicle details available.</Typography>
      )}
    </div>
  );
};

export default ViewTodayTasks;
