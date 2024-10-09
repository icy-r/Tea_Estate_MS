import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";

const Home = ({ driverId }) => {
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

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data);
      console.log('Vehicle details:', vehicleResponse.data);

      setAlert({ open: true, message: 'Driver_Vehicle details fetched successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      setVehicleDetails(null);
      setAlert({ open: true, message: 'Vehicle not found or error fetching details.', severity: 'error' });
    } finally {
      setLoading(false);
      // Automatically close the alert after 3 seconds
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));
      }, 3000);
    }
  };

  return (
    <div>
      <h1>Driver Home</h1>
      {loading && <p>Loading...</p>}
      {alert.open && (
        <div className={`alert alert-${alert.severity}`}>
          {alert.message}
        </div>
      )}
      {vehicleDetails && (
        <div>
          <h2>Vehicle Details</h2>
          {/* Display vehicle details here */}
        </div>
      )}
    </div>
  );
};

export default Home;