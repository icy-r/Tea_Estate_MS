import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import moment from 'moment'; // To format the time

const ViewDailyTasks = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [transportLog, setTransportLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  // New state for filtering options
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // Default to today's date
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (driverId) {
      fetchVehicleDetails(driverId);
    }
  }, [driverId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransportLog((prevLogs) => [...prevLogs]); // Re-trigger state update every second
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
      setTransportLog(transportLogResponse.data);
      console.log('Transport log:', transportLogResponse.data);

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

  // Filter transport logs to only show entries with matching vehicle_id and based on filter criteria
  const filteredTransportLogs = transportLog.filter(log => {
    const matchesVehicle = vehicleDetails && log.vehicle_id === vehicleDetails.id;
    const matchesDate = selectedDate ? moment(log.date).isSame(moment(selectedDate), 'day') : true;
    const matchesTime = selectedTime ? log.time === selectedTime : true;
    const matchesStatus = selectedStatus ? log.status === selectedStatus : true;

    return matchesVehicle && matchesDate && matchesTime && matchesStatus;
  });

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
      setTransportLog((prevLogs) =>
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
      <Typography variant="h4" gutterBottom>Daily Tasks</Typography>
      {loading ? (
        <CircularProgress />
      ) : vehicleDetails ? (
        <div>
          {/* Filter Inputs */}
          <div style={{ marginBottom: '16px' }}>
            <TextField
              label="Filter by Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: '8px' }}
            />

            {/* <TextField
              label="Filter by Time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              placeholder="HH:MM"
              style={{ marginRight: '8px' }}
            /> */}
              <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Filter by Time</InputLabel>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="17:00">Evening</MenuItem>
                <MenuItem value="12:00">Afternoon</MenuItem>
                <MenuItem value="08:00">Morning</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="Trip Started">Trip Started</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Display filtered transport log details */}
          {filteredTransportLogs.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
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
                  {filteredTransportLogs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell>{log.route_id}</TableCell>
                      <TableCell>{moment(log.date).format('YYYY-MM-DD')}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{calculateRemainingTime(log.time, moment(log.date).format('YYYY-MM-DD'))}</TableCell>
                      <TableCell>{log.status}</TableCell>
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
            <Typography>No transport logs available for this vehicle.</Typography>
          )}
        </div>
      ) : (
        <Typography>No vehicle details available.</Typography>
      )}
    </div>
  );
};

export default ViewDailyTasks;
