import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const RepairRequests = ({ driverId }) => {
  console.log('Driver ID:', driverId);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [formData, setFormData] = useState({
    vehicleId: "",
    issueDescription: "",
    location: "",
    assignedTechnician: null,
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    if (driverId) {
      fetchVehicleDetails(driverId);
      console.log('Fetching vehicle details for driver ID:');
    }
  }, [driverId]);

  const fetchVehicleDetails = async (id) => {
    setLoading(true);
    try {
      console.log('Fetching vehicle details for driver ID:');
      const response = await axios.get(`/drivers/${id}`);
      const vehicleId = response.data.vehicle_id;

      const vehicleResponse = await axios.get(`/vehicles/${vehicleId}`);
      setVehicleDetails(vehicleResponse.data[0]);
      console.log('Vehicle details:', vehicleResponse.data);

      setFormData((prevData) => ({
        ...prevData,
        vehicleId: vehicleId, // Set vehicleId in form data
      }));

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("requestmaintenance/", formData) // Use formData directly
      .then(() => {
        setConfirmationMessage("Issue reported successfully!");
        setFormData({
          vehicleId: "",
          issueDescription: "",
          location: "",
          assignedTechnician: null,
        });
      })
      .catch((error) => {
        console.error("Error reporting issue:", error);
        setConfirmationMessage("Failed to report issue. Please try again.");
      });
  };

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Report Vehicle Issue</h2>
        
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle ID:</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              readOnly // Make this field read-only
              className="w-full px-3 py-2 border rounded-md bg-gray-100" // Optional: gray background to indicate it's read-only
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Issue Description:</label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {confirmationMessage && <p className="mt-4">{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default RepairRequests;
