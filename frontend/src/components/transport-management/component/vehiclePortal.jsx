import React, { useState, useEffect } from 'react';
import axios from '../../../services/axios.js';
import PropTypes from 'prop-types';
import imge from '../../../assets/logo.png';
import {
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const VehiclePortal = ({ vehicle_id, isSearchOpen = true }) => {
  const [searchId, setSearchId] = useState(vehicle_id || '');
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (vehicle_id) {
      fetchVehicleDetails(vehicle_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle_id]);

  const fetchVehicleDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/vehicles/${id}`);
      setVehicleDetails(response.data[0]);
      setAlert({ open: true, message: 'Vehicle details fetched successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      setVehicleDetails(null);
      setAlert({ open: true, message: 'Vehicle not found or error fetching details.', severity: 'error' });
    } finally {
      setLoading(false);
      // Automatically close the alert after 3 seconds
      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);
    }
  };

  const handleSearch = () => {
    if (searchId.trim()) {
      fetchVehicleDetails(searchId.trim());
    } else {
      setAlert({ open: true, message: 'Please enter a valid Vehicle ID.', severity: 'warning' });
      setVehicleDetails(null);
      // Automatically close the alert after 3 seconds
      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Vehicle Portal
      </Typography>

      {/* Alert for feedback */}
      {alert.open && (
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Conditionally render the search bar based on isSearchOpen */}
      {isSearchOpen && (
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Enter Vehicle ID"
              variant="outlined"
              fullWidth
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Display Vehicle Details */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : vehicleDetails ? (
        <Card sx={{ display: 'flex', mb: 4 }}>
          {vehicleDetails.imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={imge}
              alt="Vehicle Image"
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Vehicle ID: {vehicleDetails.id}
            </Typography>
            <Typography variant="body1"><strong>Owner Name:</strong> {vehicleDetails.owner_name}</Typography>
            <Typography variant="body1"><strong>Chassis No:</strong> {vehicleDetails.chassisNo}</Typography>
            <Typography variant="body1">
              <strong>Manufacture Year:</strong> {new Date(vehicleDetails.manufactureYear).getFullYear()}
            </Typography>
            <Typography variant="body1"><strong>Assigned Department:</strong> {vehicleDetails.assignedDept}</Typography>
            <Typography variant="body1"><strong>Type:</strong> {vehicleDetails.type}</Typography>
            <Typography variant="body1"><strong>Driver ID:</strong> {vehicleDetails.driver_id}</Typography>
            <Typography variant="body1"><strong>Owner Address:</strong> {vehicleDetails.owner_address}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {vehicleDetails.status}</Typography>
          </CardContent>
        </Card>
      ) : (
        !alert.open && (
          <Typography variant="body1">
            No vehicle details to display. Please enter a Vehicle ID to search.
          </Typography>
        )
      )}
    </div>
  );
};

VehiclePortal.propTypes = {
  vehicle_id: PropTypes.string,
  isSearchOpen: PropTypes.bool, // Added PropType for isSearchOpen
};

export default VehiclePortal;
