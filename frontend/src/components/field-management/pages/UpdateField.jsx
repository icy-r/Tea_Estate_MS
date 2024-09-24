import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import updateField from "../services/axios-update.js";
import Notification from "../component/NotificationContent.jsx"; // Import the Notification component

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
    cropStage: field.cropStage,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          <div>
            <label className="block text-gray-700 mb-2">Field No</label>
            <input
              name="id"
              value={fieldData.id}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Field Name</label>
            <input
              name="name"
              value={fieldData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              name="location"
              value={fieldData.location}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Fertilizer Schedule
            </label>
            <input
              name="fertilizerSchedule"
              value={fieldData.fertilizerSchedule}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Area</label>
            <input
              name="area"
              value={fieldData.area}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Supervisor</label>
            <input
              name="labour"
              value={fieldData.labour}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              readOnly // Making supervisor field read-only
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Crop Stage</label>
            <input
              name="cropStage"
              value={fieldData.cropStage}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

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
