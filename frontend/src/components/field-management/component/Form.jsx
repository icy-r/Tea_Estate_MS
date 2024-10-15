import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material";
import axios from "../../../services/axios.js";
import createField from "../services/axios-create.js";
import Notification from "./NotificationContent.jsx";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Form() {
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    latitude: "",
    longitude: "",
    area: "",
    labour: "",
    fieldStatus: "Active",
    fertilizerSchedule: "none",
    harvest_qnty: 0,
  });

  const [polygonCoords, setPolygonCoords] = useState([]);
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
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const notify = (message, type) => {
    setNotification({ open: true, message, type });
    setTimeout(
      () => setNotification({ open: false, message: "", type: "" }),
      3000
    );
  };

  const calculateAreaAndCenter = () => {
    if (polygonCoords.length < 3) {
      notify("Please select at least 3 points on the map", "error");
      return;
    }

    // Calculate area (simple approximation)
    let area = 0;
    for (let i = 0; i < polygonCoords.length; i++) {
      let j = (i + 1) % polygonCoords.length;
      area += polygonCoords[i][0] * polygonCoords[j][1];
      area -= polygonCoords[j][0] * polygonCoords[i][1];
    }
    area = Math.abs(area) / 2;

    // Convert to hectares (very rough approximation)
    const areaInHectares = area * 1.0936 * 100000;

    // Calculate center point
    let centerLat = 0,
      centerLng = 0;
    for (let i = 0; i < polygonCoords.length; i++) {
      centerLat += polygonCoords[i][0];
      centerLng += polygonCoords[i][1];
    }
    centerLat /= polygonCoords.length;
    centerLng /= polygonCoords.length;

    setFormValues((prev) => ({
      ...prev,
      area: areaInHectares.toFixed(2),
      latitude: centerLat.toFixed(6),
      longitude: centerLng.toFixed(6),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regex = /^[a-zA-Z\s]+$/;

    const isValid = formValues.name.match(regex);
    if (!isValid) {
      notify("Field name must contain only letters and spaces", "error");
      return;
    }

    // Restructure the data to match the mongoose schema
    const fieldData = {
      ...formValues,
      location: {
        latitude: parseFloat(formValues.latitude),
        longitude: parseFloat(formValues.longitude),
      },
      area: parseFloat(formValues.area),
      harvest_qnty: parseInt(formValues.harvest_qnty, 10),
    };

    // Remove the separate latitude and longitude fields
    delete fieldData.latitude;
    delete fieldData.longitude;

    try {
      const created = await createField(fieldData, notify);

      if (created) {
        const selectedSupervisor = supervisors.find(
          (supervisor) => supervisor.firstName === formValues.labour
        );
        if (!selectedSupervisor) {
          throw new Error("Supervisor not found");
        }

        await axios.put(`/labours/${selectedSupervisor.id}`, {
          assignedField: formValues.name,
        });

        // Reset form after successful submission
        setFormValues({
          id: "",
          name: "",
          area: "",
          labour: "",
          fieldStatus: "Active",
          fertilizerSchedule: "none",
          harvest_qnty: 0,
        });
        setPolygonCoords([]);
        notify("Field created and supervisor updated", "success");
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

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPolygonCoords((prev) => [...prev, [lat, lng]]);
      },
    });
    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
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
            {/* Field No Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
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
                min="1"
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            {/* Field Name Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
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
                pattern="^[a-zA-Z\s]+$"
                title="Only letters and spaces are allowed."
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>

            {/* Map */}
            <div style={{ height: "400px", width: "100%" }}>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />
                {polygonCoords.length > 0 && (
                  <Polygon positions={polygonCoords} />
                )}
              </MapContainer>
            </div>
            <button
              type="button"
              onClick={calculateAreaAndCenter}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Calculate Area and Center
            </button>

            {/* Latitude Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Latitude
              </FormLabel>
              <Input
                name="latitude"
                type="number"
                value={formValues.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            {/* Longitude Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Longitude
              </FormLabel>
              <Input
                name="longitude"
                type="number"
                value={formValues.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            {/* Area Input */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Area (in hectares)
              </FormLabel>
              <Input
                name="area"
                type="number"
                value={formValues.area}
                onChange={handleChange}
                placeholder="Area"
                required
                min="0"
                className="border border-gray-300 p-2 rounded-md"
              />
            </FormControl>
            {/* Supervisor Select */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
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
                required
                className="border border-gray-300 p-2 rounded-md"
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
            {/* Field Status Select */}
            <FormControl className="flex flex-col">
              <FormLabel
                required
                style={{
                  fontSize: "1rem",
                  color: darkMode ? "white" : "black",
                }}
              >
                Field Status
              </FormLabel>
              <Select
                name="fieldStatus"
                value={formValues.fieldStatus}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded-md"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Needs Maintenance">Needs Maintenance</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
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
