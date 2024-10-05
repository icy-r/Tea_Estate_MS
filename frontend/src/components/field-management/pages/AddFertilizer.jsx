import React, { useState, useEffect } from "react";
import axios from "../../../services/axios.js";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  MenuItem,
  Button,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Notification from "../component/NotificationContent.jsx"; // Import Notification Component

const AddFertilizerSchedule = () => {
  const [fields, setFields] = useState([]);
  const [fertilizers, setFertilizers] = useState([
    { type: "", applicationRate: "" },
  ]);
  const [formValues, setFormValues] = useState({
    id: "",
    fieldName: "",
    scheduleName: "",
    frequency: "",
    weatherAdjustment: false, // Weather adjustment field
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  // Fetch the fields from the database to populate the dropdown
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("/fields");
        // Filter fields where fertilizerSchedule is "none"
        const availableFields = response.data.filter(
          (field) => field.fertilizerSchedule === "none"
        );
        setFields(availableFields);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };

    fetchFields();
  }, []);

  // Handle change for form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle change for the weather adjustment checkbox
  const handleWeatherAdjustmentChange = (event) => {
    setFormValues({ ...formValues, weatherAdjustment: event.target.checked });
  };

  // Handle dynamic change for fertilizer inputs
  const handleFertilizerChange = (index, field, value) => {
    const updatedFertilizers = [...fertilizers];
    updatedFertilizers[index][field] = value;
    setFertilizers(updatedFertilizers);
  };

  // Add a new fertilizer field
  const handleAddFertilizer = () => {
    setFertilizers([...fertilizers, { type: "", applicationRate: "" }]);
  };

  // Remove a fertilizer field
  const handleRemoveFertilizer = (index) => {
    const updatedFertilizers = fertilizers.filter((_, i) => i !== index);
    setFertilizers(updatedFertilizers);
  };

  // Show notification message
  const notify = (message, type) => {
    setNotification({ open: true, message, type });
    setTimeout(
      () => setNotification({ open: false, message: "", type: "" }),
      3000
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const scheduleData = { ...formValues, fertilizers };

    const regex = /^[a-zA-Z\s]+$/;

    const isValid = formValues.scheduleName.match(regex);
    if (!isValid) {
      notify("Field name must contain only letters and spaces", "error");
      return;
    }

    try {
      await axios.post("/fertilizers", scheduleData);

      const selectedField = fields.find(
        (field) => field.name === formValues.fieldName
      );

      if (selectedField) {
        await axios.put(`/fields/${selectedField.id}`, {
          fertilizerSchedule: formValues.scheduleName,
        });
      }

      notify(
        "Fertilizer Schedule added and field updated successfully!",
        "success"
      );
      // Reset the form
      setFormValues({
        id: "",
        fieldName: "",
        scheduleName: "",
        frequency: "",
        weatherAdjustment: false,
      });
      setFertilizers([{ type: "", applicationRate: "" }]);
    } catch (error) {
      console.error("Error adding fertilizer schedule:", error);
      notify("Error adding fertilizer schedule", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Notification */}
      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.type}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />

      <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-2/3 bg-white p-8 justify-center">
          <h2 className="text-2xl font-bold text-center mb-4">
            Fertilizer Schedule Details
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormControl className="flex flex-col">
              <FormLabel required>Field No</FormLabel>
              <Input
                name="id"
                value={formValues.id}
                onChange={handleChange}
                placeholder="Schedule ID"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            {/* Field Selection */}
            <FormControl className="flex flex-col">
              <FormLabel required>Field Name</FormLabel>
              <Select
                name="fieldName"
                value={formValues.fieldName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded-md"
              >
                <MenuItem value="" disabled>
                  Select Field
                </MenuItem>
                {fields.map((field) => (
                  <MenuItem key={field._id} value={field.name}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Schedule Name */}
            <FormControl className="flex flex-col">
              <FormLabel required>Schedule Name</FormLabel>
              <Input
                name="scheduleName"
                value={formValues.scheduleName}
                onChange={handleChange}
                placeholder="Schedule Name"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>

            {/* Dynamic Fertilizers */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Fertilizers</h3>
              {fertilizers.map((fertilizer, index) => (
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
                value={formValues.frequency}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded-md"
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

            {/* Weather Adjustment */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.weatherAdjustment}
                  onChange={handleWeatherAdjustmentChange}
                />
              }
              label="Weather Adjustment"
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFertilizerSchedule;
