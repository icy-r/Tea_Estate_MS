import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import updateField from "../services/axios-update.js";
import Notification from "../component/NotificationContent.jsx"; // Import the Notification component
import { FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material"; // Import MUI components

const UpdateField = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const field = location.state.field;

  const [fieldData, setFieldData] = useState({
    id: field.id,
    name: field.name,
    location: field.location,
    fertilizerSchedule: field.fertilizerSchedule,
    area: field.area,
    labour: field.labour,
    fieldStatus: field.fieldStatus,
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' or 'error'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const locationRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(fieldData.name)) {
      setNotification({
        open: true,
        message: "Field name must contain only letters and spaces.",
        severity: "error",
      });
      return false;
    }
    if (!locationRegex.test(fieldData.location)) {
      setNotification({
        open: true,
        message: "Location must contain only letters and spaces.",
        severity: "error",
      });
      return false;
    }
    if (fieldData.area < 0) {
      setNotification({
        open: true,
        message: "Area must be a positive number.",
        severity: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return; // Validate inputs before proceeding

    const result = await updateField(fieldData);
    if (result.success) {
      setNotification({
        open: true,
        message: result.message,
        severity: "success",
      });
      setTimeout(() => navigateTo("/admin/field/manage"), 3000); // Redirect after a delay
    } else {
      setNotification({
        open: true,
        message: result.message,
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
        <h1 className="text-2xl font-bold text-center mb-6">Update Field</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FormControl className="flex flex-col">
            <FormLabel required>Field No</FormLabel>
            <Input
              name="id"
              value={fieldData.id}
              readOnly
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Field Name</FormLabel>
            <Input
              name="name"
              value={fieldData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Location</FormLabel>
            <Input
              name="location"
              value={fieldData.location}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Fertilizer Schedule</FormLabel>
            <Input
              name="fertilizerSchedule"
              value={fieldData.fertilizerSchedule}
              readOnly
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Area (in hectares)</FormLabel>
            <Input
              name="area"
              type="number"
              value={fieldData.area}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Supervisor</FormLabel>
            <Input
              name="labour"
              value={fieldData.labour}
              readOnly
              className="border border-gray-300 p-3 rounded-md"
            />
          </FormControl>

          <FormControl className="flex flex-col">
            <FormLabel required>Field Status</FormLabel>
            <Select
              name="fieldStatus"
              value={fieldData.fieldStatus}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Needs Maintenance">Needs Maintenance</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>

          <button
            type="submit"
            className="bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Confirm Update
          </button>
        </form>
      </div>

      {/* Notification Component */}
      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Set anchor origin
      />
    </div>
  );
};

export default UpdateField;
