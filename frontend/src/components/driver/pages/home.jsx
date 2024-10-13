import React, { useState, useEffect } from 'react';
import axios from "../../../services/axios.js";
import ViewTodayTasks from "../component/TodayTaskShower.jsx";
 import DriverAnalytics from '../component/driverAnalytics.jsx';

const Home = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [vehicleId, setVehicleId] = useState(null); // Initialize vehicleId state

  useEffect(() => {
    if (driverId) {
      fetchVehicleDetails(driverId);
    }
  }, [driverId]);

  const fetchVehicleDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/drivers/${id}`);
      const vehicleId = response.data.vehicle_id; // Get vehicle ID
      console.log('Vehicle ID:', vehicleId);
      setVehicleId(vehicleId); // Set vehicleId state

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data); // Assume this is an object
      console.log('Vehicle details:', vehicleResponse.data);

      // setAlert({ open: true, message: 'Driver_Vehicle details fetched successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      setVehicleDetails(null);
      // setAlert({ open: true, message: 'Vehicle not found or error fetching details.', severity: 'error' });
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
      
      {loading && <p>Loading...</p>}
      {alert.open && (
        <div className={`alert alert-${alert.severity}`}>
          {alert.message}
        </div>
      )}
      
      <ViewTodayTasks driverId={driverId} />
      {vehicleId && <DriverAnalytics vehicleId={vehicleId} />} 
    </div>
  );
};

export default Home;
