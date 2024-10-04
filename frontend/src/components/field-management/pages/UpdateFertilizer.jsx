import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../services/axios.js";
import Notification from "../component/NotificationContent.jsx";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  MenuItem,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const UpdateFertilizerSchedule = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const fertilizer = location.state.fertilizer; // Get the passed fertilizer data from location.state

  const [fertilizerData, setFertilizerData] = useState({
    fieldName: fertilizer.fieldName, // Read-only
    scheduleName: fertilizer.scheduleName,
    fertilizers: fertilizer.fertilizers,
    frequency: fertilizer.frequency,
    weatherAdjustment: fertilizer.weatherAdjustment,
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' or 'error'
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFertilizerData({ ...fertilizerData, [name]: value });
  };

  // Handle dynamic change for fertilizers
  const handleFertilizerChange = (index, field, value) => {
    const updatedFertilizers = [...fertilizerData.fertilizers];
    updatedFertilizers[index][field] = value; // Preserve other fields like _id
    setFertilizerData({ ...fertilizerData, fertilizers: updatedFertilizers });
  };

  // Add new fertilizer field (without _id for new entry)
  const handleAddFertilizer = () => {
    setFertilizerData({
      ...fertilizerData,
      fertilizers: [
        ...fertilizerData.fertilizers,
        { type: "", applicationRate: "" }, // No _id for new fertilizer entries
      ],
    });
  };

  // Remove a fertilizer field
  const handleRemoveFertilizer = (index) => {
    const updatedFertilizers = fertilizerData.fertilizers.filter(
      (_, i) => i !== index
    );
    setFertilizerData({ ...fertilizerData, fertilizers: updatedFertilizers });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedData = {
        ...fertilizerData,
        fertilizers: fertilizerData.fertilizers.map((f) => ({
          _id: f._id, // Include _id to ensure it remains intact
          type: f.type,
          applicationRate: f.applicationRate,
        })),
      };

      // Ensure that the payload structure matches what the backend expects
      await axios.put(`/fertilizers/${fertilizer.id}`, updatedData); // Update request to backend

      setNotification({
        open: true,
        message: "Fertilizer schedule updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigateTo("/admin/field/manage-fertilizer"), 3000); // Redirect after success
    } catch (error) {
      console.error("Error updating fertilizer schedule:", error);
      setNotification({
        open: true,
        message: "Error updating fertilizer schedule.",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Update Fertilizer Schedule
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Field Name (Read-Only) */}
          <FormControl className="flex flex-col">
            <FormLabel required>Field Name</FormLabel>
            <Input
              name="fieldName"
              value={fertilizerData.fieldName}
              readOnly
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          {/* Schedule Name */}
          <FormControl className="flex flex-col">
            <FormLabel required>Schedule Name</FormLabel>
            <Input
              name="scheduleName"
              value={fertilizerData.scheduleName}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          {/* Dynamic Fertilizers */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Fertilizers</h3>
            {fertilizerData.fertilizers.map((fertilizer, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <TextField
                  label="Fertilizer Type"
                  value={fertilizer.type}
                  onChange={(e) =>
                    handleFertilizerChange(index, "type", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Application Rate"
                  type="number"
                  value={fertilizer.applicationRate}
                  onChange={(e) =>
                    handleFertilizerChange(
                      index,
                      "applicationRate",
                      e.target.value
                    )
                  }
                  required
                />
                {index > 0 && (
                  <IconButton onClick={() => handleRemoveFertilizer(index)}>
                    <RemoveIcon />
                  </IconButton>
                )}
              </div>
            ))}
            <Button
              onClick={handleAddFertilizer}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Add Fertilizer
            </Button>
          </div>

          {/* Frequency Dropdown */}
          <FormControl className="flex flex-col">
            <FormLabel required>Application Frequency</FormLabel>
            <Select
              name="frequency"
              value={fertilizerData.frequency}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md"
            >
              <MenuItem value="" disabled>
                Select Frequency
              </MenuItem>
              <MenuItem value="Once a week">Once a week</MenuItem>
              <MenuItem value="Twice a week">Twice a week</MenuItem>
              <MenuItem value="Once in 2 weeks">Once in 2 weeks</MenuItem>
              <MenuItem value="When advised">When advised</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Confirm Update
          </Button>
        </form>
      </div>

      {/* Notification Component */}
      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default UpdateFertilizerSchedule;
