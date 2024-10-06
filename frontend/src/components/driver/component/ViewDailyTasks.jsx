import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button } from '@mui/material';
import moment from 'moment'; // To format the time

const ViewDailyTasks = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [transportLog, setTransportLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

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

  // Filter transport logs to only show entries with matching vehicle_id
  const filteredTransportLogs = transportLog.filter(log => vehicleDetails && log.vehicle_id === vehicleDetails.id);

  // Function to calculate remaining time
  const calculateRemainingTime = (logTime,logDate) => {
    const currentTime = moment();

    const logtime = moment(logDate+logTime, "YYYY-MM-DD HH:mm");

    const scheduledTime = moment(logtime); // Assuming logTime is the scheduled time
    const duration = moment.duration(scheduledTime.diff(currentTime));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (duration.asMilliseconds() <= 0) {
      return 'Time expired';
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Function to update the status of a transport log
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/transportLog/${id}`, { status: newStatus });
      setAlert({ open: true, message: 'Status updated successfully!', severity: 'success' });

      // Update the transport log state after successful update
      setTransportLog((prevLogs) =>
        prevLogs.map((log) => (log._id === id ? { ...log, status: newStatus } : log))
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
          

          {/* Display filtered transport log details */}
          {filteredTransportLogs.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Transport ID</TableCell> */}
                    <TableCell>Route ID</TableCell>
                    <TableCell>Scheduled Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Remaining Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransportLogs.map((log) => (
                    <TableRow key={log._id}>
                      {/* <TableCell>{log._id}</TableCell> */}
                      <TableCell>{log.route_id}</TableCell>
                      <TableCell>{moment(log.date).format('YYYY-MM-DD')}</TableCell>
                      
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{calculateRemainingTime(log.time,moment(log.date).format('YYYY-MM-DD'))}</TableCell>
                      <TableCell>{log.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateStatus(log._id, 'Active')}
                          disabled={log.status === 'Active'}
                          style={{ marginRight: '8px' }}
                        >
                          Set Active
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleUpdateStatus(log._id, 'Maintenance')}
                          disabled={log.status === 'Maintenance'}
                        >
                          Set Maintenance
                        </Button>
                    
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
