import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import img from "../../../assets/dashboard/truckPlaceholder.png";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Grid,
  Alert,
  Snackbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const ManageAssignedVehicle = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
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
      const response = await axios.get(`/drivers/${id}`);
      const vehicleId = response.data.vehicle_id;
      console.log('Driver details:', response.data);

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data[0]);
      console.log('Vehicle details:', vehicleResponse.data);

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Assigned Vehicle
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : vehicleDetails ? (
        <div className='px-20'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
                <img src={img} alt="Vehicle" width="100%" style={{ maxHeight: '300px', objectFit: 'contain' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#15F5BA'}}>
                        <TableCell ><strong>Attribute</strong></TableCell>
                        <TableCell><strong>Details</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Vehicle ID</TableCell>
                        <TableCell>{vehicleDetails.id || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Name</TableCell>
                        <TableCell>{vehicleDetails.owner_name || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chassis Number</TableCell>
                        <TableCell>{vehicleDetails.chassisNo || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Manufacture Year</TableCell>
                        <TableCell>{vehicleDetails.manufactureYear || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Assigned Department</TableCell>
                        <TableCell>{vehicleDetails.assignedDept || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vehicle Type</TableCell>
                        <TableCell>{vehicleDetails.type || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Driver ID</TableCell>
                        <TableCell>{vehicleDetails.driver_id || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Address</TableCell>
                        <TableCell>{vehicleDetails.owner_address || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{vehicleDetails.status || 'N/A'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
           
            </Grid>
        </div>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No vehicle assigned to this driver.
        </Typography>
      )}

      {/* Alert */}
      <Snackbar open={alert.open} autoHideDuration={3000}>
        <Alert severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageAssignedVehicle;
