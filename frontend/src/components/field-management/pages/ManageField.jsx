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

const ManageField = () => {
  const [fields, setFields] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [selectedFieldName, setSelectedFieldName] = useState(null); // Track selected field name
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigateTo = useNavigate();

  // Fetch fields
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

  // Open delete confirmation dialog
  const handleOpenDialog = (id, name) => {
    setSelectedFieldId(id);
    setSelectedFieldName(name); // Set the selected field name
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFieldId(null);
    setSelectedFieldName(null);
  };

  // Fetch fertilizer schedule ID by field name
  const getFertilizerScheduleIdByFieldName = async (fieldName) => {
    try {
      const response = await axios.get("/fertilizers", {
        params: { fieldName },
      });
      const fertilizerSchedule = response.data.find(
        (f) => f.fieldName === fieldName
      );
      return fertilizerSchedule ? fertilizerSchedule.id : null; // Return fertilizer schedule ID
    } catch (error) {
      console.error("Error fetching fertilizer schedule:", error);
      return null;
    }
  };

  // Reassign only laborers whose assignedField matches the field being deleted
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

  // Handle field deletion
  const handleDelete = async () => {
    try {
      // Delete the field
      await axios.delete(`/fields/${selectedFieldId}`);

      // Fetch and delete fertilizer schedule by field name
      const fertilizerScheduleId = await getFertilizerScheduleIdByFieldName(
        selectedFieldName
      );
      if (fertilizerScheduleId) {
        await axios.delete(`/fertilizers/${fertilizerScheduleId}`);
      }

      // Reassign laborers whose assignedField is the deleted field
      await reassignLaborers(selectedFieldName);

      // Update the fields state after deletion
      setFields(fields.filter((field) => field.id !== selectedFieldId));
      handleCloseDialog();

      // Set success notification and open snackbar
      setSnackbarMessage("Field and related data deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting field and related data:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Field Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Field No</th>
              <th className="py-2 px-4 text-left">Field Name</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Fertilizer Schedule</th>
              <th className="py-2 px-4 text-left">Area</th>
              <th className="py-2 px-4 text-left">Supervisor</th>
              <th className="py-2 px-4 text-left">Field Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.length > 0 ? (
              fields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{field.id}</td>
                  <td className="py-2 px-4 border">{field.name}</td>
                  <td className="py-2 px-4 border">{field.location}</td>
                  <td className="py-2 px-4 border">
                    {field.fertilizerSchedule}
                  </td>
                  <td className="py-2 px-4 border">{field.area}</td>
                  <td className="py-2 px-4 border">{field.labour}</td>
                  <td className="py-2 px-4 border">{field.fieldStatus}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdate(field)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleOpenDialog(field.id, field.name)} // Open delete dialog
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No fields available
                </td>
              </tr>
            )}
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
