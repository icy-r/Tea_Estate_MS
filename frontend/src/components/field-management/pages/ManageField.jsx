import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Updated import

const ManageField = () => {
  const [fields, setFields] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [selectedFieldName, setSelectedFieldName] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expandedField, setExpandedField] = useState(null);
  const navigateTo = useNavigate();

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/fields/");
      setFields(response.data);
    } catch (error) {
      console.error("Error fetching fields data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdate = (field) => {
    navigateTo(`/admin/field/manage/${field.id}`, { state: { field } });
  };

  const handleOpenDialog = (id, name) => {
    setSelectedFieldId(id);
    setSelectedFieldName(name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFieldId(null);
    setSelectedFieldName(null);
  };

  const getFertilizerScheduleIdByFieldName = async (fieldName) => {
    try {
      const response = await axios.get("/fertilizers", {
        params: { fieldName },
      });
      const fertilizerSchedule = response.data.find(
        (f) => f.fieldName === fieldName
      );
      return fertilizerSchedule ? fertilizerSchedule.id : null;
    } catch (error) {
      console.error("Error fetching fertilizer schedule:", error);
      return null;
    }
  };

  const reassignLaborers = async (fieldName) => {
    try {
      const response = await axios.get("/labours", {
        params: { assignedField: fieldName },
      });
      const laborersToUpdate = response.data.filter(
        (labour) => labour.assignedField === fieldName
      );
      await Promise.all(
        laborersToUpdate.map((labour) =>
          axios.put(`/labours/${labour.id}`, { assignedField: "none" })
        )
      );
    } catch (error) {
      console.error("Error reassigning laborers:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/fields/${selectedFieldId}`);

      const fertilizerScheduleId = await getFertilizerScheduleIdByFieldName(
        selectedFieldName
      );
      if (fertilizerScheduleId) {
        await axios.delete(`/fertilizers/${fertilizerScheduleId}`);
      }

      await reassignLaborers(selectedFieldName);

      setFields(fields.filter((field) => field.id !== selectedFieldId));
      handleCloseDialog();

      setSnackbarMessage("Field and related data deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting field and related data:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const toggleExpand = (fieldId) => {
    setExpandedField(expandedField === fieldId ? null : fieldId);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Field Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Field ID</th>
              <th className="py-2 px-4 text-left">Field Name</th>
              <th className="py-2 px-4 text-left">Fertilizer Schedule</th>
              <th className="py-2 px-4 text-left">Field Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
              <th className="py-2 px-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <React.Fragment key={field.id}>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{field.id}</td>
                  <td className="py-2 px-4 border">{field.name}</td>
                  <td className="py-2 px-4 border">
                    {field.fertilizerSchedule}
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        field.fieldStatus === "Active"
                          ? "bg-green-500 text-white"
                          : field.fieldStatus === "Inactive"
                          ? "bg-red-500 text-white"
                          : field.fieldStatus === "In Progress"
                          ? "bg-yellow-500 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {field.fieldStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdate(field)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleOpenDialog(field.id, field.name)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => toggleExpand(field.id)}
                    >
                      {expandedField === field.id ? (
                        <ExpandLess /> // Updated icon
                      ) : (
                        <ExpandMore /> // Updated icon
                      )}
                    </button>
                  </td>
                </tr>
                {expandedField === field.id && (
                  <tr>
                    <td colSpan="6" className="py-4 px-4 border">
                      <div className="flex">
                        <div className="w-1/2 pr-4">
                          <MapContainer
                            center={[
                              field.location.latitude,
                              field.location.longitude,
                            ]}
                            zoom={13}
                            style={{ height: "200px", width: "100%" }}
                          >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                              position={[
                                field.location.latitude,
                                field.location.longitude,
                              ]}
                            />
                          </MapContainer>
                        </div>
                        <div className="w-1/2 pl-4">
                          <h3 className="font-semibold mb-2">
                            Additional Details
                          </h3>
                          <p>
                            <span className="font-medium">
                              Calculated Area:
                            </span>{" "}
                            {field.area} hectares
                          </p>
                          <p>
                            <span className="font-medium">
                              Harvest Quantity:
                            </span>{" "}
                            {field.harvest_qnty}
                          </p>
                          <p>
                            <span className="font-medium">Supervisor:</span>{" "}
                            {field.labour}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this field?</p>
          <p>
            Deleting this field will also delete its Fertilizer Schedule &
            Reassign the employees assigned to this field.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageField;