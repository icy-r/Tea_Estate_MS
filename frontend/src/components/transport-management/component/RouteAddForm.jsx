import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import axios from "../../../services/axios.js";

const RouteAddForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    distance: "",
    tripsPerDayNeeded: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/routes", formData);
      console.log("Route added successfully:", response.data);
      setSnackbarMessage("Route added successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding route:", error);
      setSnackbarMessage("Error adding route. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleClear = () => {
    setFormData({
      id: "",
      distance: "",
      tripsPerDayNeeded: "",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-start p-8">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">Add New Route</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Route ID"
                variant="outlined"
                required
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
              <TextField
                label="Distance (km)"
                variant="outlined"
                required
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <TextField
                label="Trips Per Day"
                variant="outlined"
                required
                name="tripsPerDayNeeded"
                value={formData.tripsPerDayNeeded}
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button type="submit" variant="contained" color="primary">
                Add Route
              </Button>
              <Button variant="outlined" color="primary" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position in top right
        // Optional: Add transition for entering and leaving
        TransitionComponent={(props) => (
          <div {...props} style={{ transition: "transform 0.5s ease" }} />
        )}
      />
    </>
  );
};

export default RouteAddForm;
