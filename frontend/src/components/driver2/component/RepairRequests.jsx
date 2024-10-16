import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RepairRequestList from "./RepairRequestList";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const RepairRequests = ({ driverId }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [formData, setFormData] = useState({
    vehicleId: "", // This will be auto-filled with chassisNo
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close

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
      const vehicle = vehicleResponse.data[0];
      setVehicleDetails(vehicle);
      console.log("Vehicle details fetched successfully:", vehicle);

      // Automatically set chassisNo as vehicleId in the form
      setFormData((prevData) => ({
        ...prevData,
        vehicleId: vehicle.chassisNo, // Auto-fill the chassisNo
      }));

      setAlert({
        open: true,
        message: "Driver-Vehicle details fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      setVehicleDetails(null);
      setAlert({
        open: true,
        message: "Vehicle not found or error fetching details.",
        severity: "error",
      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if vehicle is already in maintenance
    if (vehicleDetails?.status === "Maintenance") {
      setAlert({
        open: true,
        message: "Cannot add new repair requests. Vehicle is already in maintenance.",
        severity: "error",
      });
      return;
    }

    try {
      // Send the repair request
      await axios.post("/requestmaintenance/", formData);

      // Update the vehicle's status to "Unavailable" after reporting the issue
      await axios.put(`/vehicles/${vehicleDetails.id}`, { status: "Maintenance" });

      // Reset form data
      setFormData({
        vehicleId: vehicleDetails ? vehicleDetails.chassisNo : "",
        description: "",
        location: "",
      });

      // Show success message in Snackbar
      setAlert({
        open: true,
        message: "Issue reported successfully! Vehicle status updated to Unavailable.",
        severity: "success",
      });

      // Refresh vehicle details to reflect the updated status
      fetchVehicleDetails(driverId);
    } catch (error) {
      console.error("Error reporting issue:", error);
      setAlert({
        open: true,
        message: "Failed to report issue. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex w-full justify-center items-start p-2 px-40">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Report Vehicle Issue</h2>

        {loading ? (
          <p>Loading vehicle details...</p>
        ) : (
          vehicleDetails && (
            <div className="mb-4">
              <p>Vehicle Status: {vehicleDetails.status}</p>
            </div>
          )
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle ID:</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              disabled // Disable input field so user can't change it
              className="w-full px-3 py-2 border rounded-md bg-gray-100" // Background changed to indicate it's disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Issue Description:</label>
            <textarea
              name="description"
              value={formData.description}
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
            className="w-40 bg-color_button text-black py-2 rounded-md hover:bg-color_extra"
          >
            Submit
          </button>

          {/* Button to open Repair Requests List dialog */}
          <button
            type="button"
            onClick={handleDialogOpen}
            className="ml-4 w-40 bg-color_button text-black py-2 rounded-md hover:bg-color_extra"
          >
            View Repair Requests
          </button>
        </form>

        {/* Snackbar for success/failure messages */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioned in the top right corner
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={alert.severity} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>

        {/* Dialog for Repair Request List */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Available Repair Requests</DialogTitle>
          <DialogContent>
            <RepairRequestList />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RepairRequests;
