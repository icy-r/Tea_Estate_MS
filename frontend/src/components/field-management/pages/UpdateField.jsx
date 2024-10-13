import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import updateField from "../services/axios-update.js";
import Notification from "../component/NotificationContent.jsx";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const UpdateField = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const field = location.state.field;

  const [fieldData, setFieldData] = useState({
    id: field.id,
    name: field.name,
    location: {
      latitude: field.location.latitude,
      longitude: field.location.longitude,
    },
    fertilizerSchedule: field.fertilizerSchedule,
    area: field.area,
    labour: field.labour,
    fieldStatus: field.fieldStatus,
    harvest_qnty: field.harvest_qnty,
  });

  const [polygonCoords, setPolygonCoords] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (field.polygonCoords) {
      setPolygonCoords(field.polygonCoords);
    }
  }, [field]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setFieldData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(fieldData.name)) {
      setNotification({
        open: true,
        message: "Field name must contain only letters and spaces.",
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

    if (!validateInputs()) return;

    const result = await updateField(fieldData);
    if (result.success) {
      setNotification({
        open: true,
        message: result.message,
        severity: "success",
      });
      setTimeout(() => navigateTo("/admin/field/manage"), 3000);
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

  const calculateAreaAndCenter = () => {
    if (polygonCoords.length < 3) {
      setNotification({
        open: true,
        message: "Please select at least 3 points on the map",
        severity: "error",
      });
      return;
    }

    let area = 0;
    for (let i = 0; i < polygonCoords.length; i++) {
      let j = (i + 1) % polygonCoords.length;
      area += polygonCoords[i][0] * polygonCoords[j][1];
      area -= polygonCoords[j][0] * polygonCoords[i][1];
    }
    area = Math.abs(area) / 2;

    const areaInHectares = area * 1.0936 * 10000;

    let centerLat = 0,
      centerLng = 0;
    for (let i = 0; i < polygonCoords.length; i++) {
      centerLat += polygonCoords[i][0];
      centerLng += polygonCoords[i][1];
    }
    centerLat /= polygonCoords.length;
    centerLng /= polygonCoords.length;

    setFieldData((prevData) => ({
      ...prevData,
      area: areaInHectares.toFixed(2),
      location: {
        latitude: centerLat.toFixed(6),
        longitude: centerLng.toFixed(6),
      },
    }));
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
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Field</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <FormControl className="flex flex-col mb-4">
              <FormLabel required>Field No</FormLabel>
              <Input
                name="id"
                value={fieldData.id}
                readOnly
                className="border border-gray-300 p-3 rounded-md"
              />
            </FormControl>

            <FormControl className="flex flex-col mb-4">
              <FormLabel required>Field Name</FormLabel>
              <Input
                name="name"
                value={fieldData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-md"
              />
            </FormControl>

            <FormControl className="flex flex-col mb-4">
              <FormLabel required>Latitude</FormLabel>
              <Input
                name="latitude"
                type="number"
                value={fieldData.location.latitude}
                onChange={handleLocationChange}
                required
                className="border border-gray-300 p-3 rounded-md"
              />
            </FormControl>

            <FormControl className="flex flex-col mb-4">
              <FormLabel required>Longitude</FormLabel>
              <Input
                name="longitude"
                type="number"
                value={fieldData.location.longitude}
                onChange={handleLocationChange}
                required
                className="border border-gray-300 p-3 rounded-md"
              />
            </FormControl>

            <FormControl className="flex flex-col mb-4">
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

            <FormControl className="flex flex-col mb-4">
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
          </div>

          <div className="w-full h-96 mb-4">
            <MapContainer
              center={[
                fieldData.location.latitude,
                fieldData.location.longitude,
              ]}
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

          <Button
            type="button"
            onClick={calculateAreaAndCenter}
            variant="contained"
            color="primary"
            className="mb-4"
          >
            Calculate Area and Center
          </Button>

          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleSubmit(field)}
          >
            Update
          </button>
        </form>
      </div>

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

export default UpdateField;
