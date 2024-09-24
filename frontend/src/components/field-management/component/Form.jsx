import { FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material";  
import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import createField from "../services/axios-create.js";
import Notification from "./NotificationContent.jsx"; // Import your Notification component

export default function Form() {
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    location: "",
    fertilizerSchedule: "",
    area: "",
    labour: "", // Single selection support
    cropStage: "",
  });
  const [supervisors, setSupervisors] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get("/labours");
        console.log("API Response:", response.data);
        const supervisorList = response.data.filter(
          (labour) =>
            labour.role === "Supervisor" && labour.assignedField === "none"
        );
        setSupervisors(supervisorList);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setDarkMode(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Selected Value:", value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const notify = (message, type) => {
    setNotification({ open: true, message, type });
    // Optional: Auto-hide the notification after a few seconds
    setTimeout(
      () => setNotification({ open: false, message: "", type: "" }),
      3000
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const created = await createField(formValues, notify);

      if (created) {
        const selectedSupervisor = supervisors.find(
          (supervisor) => supervisor.firstName === formValues.labour
        );
        if (!selectedSupervisor) {
          throw new Error("Supervisor not found");
        }

        console.log("Supervisor ID:", selectedSupervisor._id);
        console.log("Updating assignedField to:", formValues.name);

        // Attempt to update the supervisor's assignedField
        const response = await axios.put(`/labours/${selectedSupervisor.id}`, {
          assignedField: formValues.name,
        });

        console.log("Update Response:", response.data);

        // Reset form after successful submission
        setFormValues({
          id: "",
          name: "",
          location: "",
          fertilizerSchedule: "",
          area: "",
          labour: "",
          cropStage: "",
        });
      }
    } catch (error) {
      console.error("Error creating field or updating labour:", error);
      notify(
        "Error creating field or updating labour: " + error.message,
        "error"
      );
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        message={notification.message}
        type={notification.type}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Set anchor origin
      />
      <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-2/3 bg-white p-8 justify-center">
          <h2 className="text-2xl font-bold text-center mb-4">
            Fertilizer Schedule Details
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Field No Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Field No
              </FormLabel>
              <Input
                name="id"
                type="number"
                value={formValues.id}
                onChange={handleChange}
                placeholder="Field No"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </FormControl>

            {/* Field Name Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Field Name
              </FormLabel>
              <Input
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Field Name"
                required
                pattern="^[a-zA-Z\s]+$" // Only letters and spaces
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </FormControl>

            {/* Location Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Location
              </FormLabel>
              <Input
                name="location"
                value={formValues.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </FormControl>

            {/* Fertilizer Schedule Select */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Fertilizer Schedule
              </FormLabel>
              <Select
                name="fertilizerSchedule"
                value={formValues.fertilizerSchedule}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <MenuItem value="" disabled>
                  Select Schedule
                </MenuItem>
                <MenuItem value="Schedule 01">Schedule 01</MenuItem>
                <MenuItem value="Schedule 02">Schedule 02</MenuItem>
                <MenuItem value="Schedule 03">Schedule 03</MenuItem>
              </Select>
            </FormControl>

            {/* Area Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Area
              </FormLabel>
              <Input
                name="area"
                type="number" // Change to text for manual entry
                value={formValues.area}
                onChange={handleChange}
                placeholder="Area"
                required
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </FormControl>

            {/* Supervisor Select */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Supervisor
              </FormLabel>
              <Select
                name="labour"
                value={formValues.labour}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <MenuItem value="" disabled>
                  Select Supervisor
                </MenuItem>
                {supervisors.map((supervisor) => (
                  <MenuItem key={supervisor._id} value={supervisor.firstName}>
                    {supervisor.firstName} {supervisor.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Crop Stage Select */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                className="text-sm"
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Crop Stage
              </FormLabel>
              <Select
                name="cropStage"
                value={formValues.cropStage}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <MenuItem value="" disabled>
                  Select Crop Stage
                </MenuItem>
                <MenuItem value="Preparation Stage">Stage 1</MenuItem>
                <MenuItem value="Weeding Stage">Stage 2</MenuItem>
                <MenuItem value="Harvesting Stage">Stage 3</MenuItem>
              </Select>
            </FormControl>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
