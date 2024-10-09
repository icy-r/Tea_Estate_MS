import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const ManageFertilizer = () => {
  const [fertilizers, setFertilizers] = useState([]); // State for fertilizer schedules
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFertilizerId, setSelectedFertilizerId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigateTo = useNavigate();

  // Fetch all fertilizer schedules
  const fetchFertilizerDetails = async () => {
    try {
      const response = await axios.get("/fertilizers");
      setFertilizers(response.data);
    } catch (error) {
      console.error("Error fetching fertilizer schedules:", error);
    }
  };

  useEffect(() => {
    fetchFertilizerDetails();
  }, []);

  // Navigate to the update page with selected fertilizer data
  const handleUpdate = (fertilizer) => {
    navigateTo(`/admin/field/manage-fertilizer/${fertilizer.id}`, {
      state: { fertilizer },
    });
  };

  // Open delete confirmation dialog
  const handleOpenDialog = (id) => {
    setSelectedFertilizerId(id);
    setOpenDialog(true);
  };

  // Close delete confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFertilizerId(null);
  };

  // Delete fertilizer schedule
  const handleDelete = async () => {
    try {
      await axios.delete(`/fertilizers/${selectedFertilizerId}`);
      setFertilizers(
        fertilizers.filter(
          (fertilizer) => fertilizer.id !== selectedFertilizerId
        )
      );
      handleCloseDialog();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting fertilizer schedule:", error);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Fertilizer Schedule Management
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Schedule No</th>
              <th className="py-2 px-4 text-left">Schedule Name</th>
              <th className="py-2 px-4 text-left">Field</th>
              <th className="py-2 px-4 text-left">Fertilizers</th>
              <th className="py-2 px-4 text-left">Frequency</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.length > 0 ? (
              fertilizers.map((fertilizer) => (
                <tr key={fertilizer._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{fertilizer.id}</td>
                  <td className="py-2 px-4 border">
                    {fertilizer.scheduleName}
                  </td>
                  <td className="py-2 px-4 border">{fertilizer.fieldName}</td>
                  <td className="py-2 px-4 border">
                    {fertilizer.fertilizers.map((f, index) => (
                      <span key={index}>
                        {f.type} ({f.applicationRate} kg)
                        <br />
                      </span>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">{fertilizer.frequency}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdate(fertilizer)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleOpenDialog(fertilizer.id)} // Open delete dialog
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No fertilizer schedules available
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
          <p>Are you sure you want to delete this fertilizer schedule?</p>
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
          Fertilizer Schedule Deleted Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageFertilizer;
