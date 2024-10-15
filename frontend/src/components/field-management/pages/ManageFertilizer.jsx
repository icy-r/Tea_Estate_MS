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
import FertilizerLog from "../component/FertilizerLog.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ManageFertilizer = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFertilizerId, setSelectedFertilizerId] = useState(null);
  const [selectedFieldName, setSelectedFieldName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showFertilizerLog, setShowFertilizerLog] = useState(false);
  const [expandedFertilizers, setExpandedFertilizers] = useState({});
  const navigateTo = useNavigate();

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

  const findIdByFieldName = async (fieldName) => {
    try {
      const response = await axios.get(`/fields?name=${fieldName}`);
      return response.data.length > 0 ? response.data[0].id : null;
    } catch (error) {
      console.error("Error fetching field by name:", error);
      return null;
    }
  };

  const handleUpdate = (fertilizer) => {
    navigateTo(`/admin/field/manage-fertilizer/${fertilizer.id}`, {
      state: { fertilizer },
    });
  };

  const handleOpenDialog = (id, fieldName) => {
    setSelectedFertilizerId(id);
    setSelectedFieldName(fieldName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFertilizerId(null);
    setSelectedFieldName("");
  };

  const handleDelete = async () => {
    try {
      const fieldId = await findIdByFieldName(selectedFieldName);

      await axios.delete(`/fertilizers/${selectedFertilizerId}`);
      setFertilizers(
        fertilizers.filter(
          (fertilizer) => fertilizer.id !== selectedFertilizerId
        )
      );

      if (fieldId) {
        await axios.put(`/fields/${fieldId}`, { fertilizerSchedule: "none" });
      }

      handleCloseDialog();
      setSnackbarMessage("Fertilizer schedule deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting fertilizer schedule:", error);
      setSnackbarMessage("Error deleting fertilizer schedule");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleShowFertilizerLog = () => {
    setShowFertilizerLog(true);
  };

  const handleBackToManageFertilizer = () => {
    setShowFertilizerLog(false);
  };

  const handleToggleDetails = (id) => {
    setExpandedFertilizers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleScheduleNow = async (fertilizer) => {
    try {
      const response = await axios.post(`/fertilizers/${fertilizer.id}/apply`);
      if (response.status === 200) {
        setSnackbarMessage("Fertilizer applied successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchFertilizerDetails(); // Refresh the fertilizer list
      }
    } catch (error) {
      console.error("Error applying fertilizer:", error);
      setSnackbarMessage("Error applying fertilizer");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="p-8">
      {showFertilizerLog ? (
        <FertilizerLog onBack={handleBackToManageFertilizer} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">
              Fertilizer Schedule Management
            </h1>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowFertilizerLog}
            >
              Show Fertilizer Log
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-teal-500 text-white">
                  <th className="py-2 px-4 text-left">Schedule No</th>
                  <th className="py-2 px-4 text-left">Schedule Name</th>
                  <th className="py-2 px-4 text-left">Field</th>
                  <th className="py-2 px-4 text-left">Fertilizers</th>
                  <th className="py-2 px-4 text-left">Frequency</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                  <th className="py-2 px-4 text-left">More Details</th>
                </tr>
              </thead>
              <tbody>
                {fertilizers.length > 0 ? (
                  fertilizers.map((fertilizer) => (
                    <React.Fragment key={fertilizer._id}>
                      <tr className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{fertilizer.id}</td>
                        <td className="py-2 px-4 border">
                          {fertilizer.scheduleName}
                        </td>
                        <td className="py-2 px-4 border">
                          {fertilizer.fieldName}
                        </td>
                        <td className="py-2 px-4 border">
                          {fertilizer.fertilizers.map((f, index) => (
                            <span key={index}>
                              {f.type} ({f.applicationRate} kg)
                              <br />
                            </span>
                          ))}
                        </td>
                        <td className="py-2 px-4 border">
                          {fertilizer.frequency}
                        </td>
                        <td className="py-2 px-4 border">
                          {fertilizer.lastFertilizationDate &&
                          fertilizer.lastFertilizationDate !== "NA"
                            ? "Active"
                            : "Inactive"}
                        </td>
                        <td className="py-2 px-4 border flex justify-center gap-2">
                          <button
                            className="bg-teal-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleUpdate(fertilizer)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              handleOpenDialog(
                                fertilizer.id,
                                fertilizer.fieldName
                              )
                            }
                          >
                            Delete
                          </button>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleScheduleNow(fertilizer)}
                          >
                            Schedule Now
                          </button>
                        </td>
                        <td className="py-2 px-4 border">
                          <button
                            onClick={() => handleToggleDetails(fertilizer.id)}
                            className="flex items-center"
                          >
                            {expandedFertilizers[fertilizer.id] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedFertilizers[fertilizer.id] && (
                        <tr className="bg-gray-50">
                          <td colSpan="8" className="py-2 px-4">
                            <div className="pl-4">
                              <div>
                                <strong>Weather Adjustment:</strong>{" "}
                                {fertilizer.weatherAdjustment ? "Yes" : "No"}
                              </div>
                              <div>
                                <strong>Last Fertilization Date:</strong>{" "}
                                {fertilizer.lastFertilizationDate &&
                                fertilizer.lastFertilizationDate !== "NA"
                                  ? new Date(
                                      fertilizer.lastFertilizationDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </div>
                              <div>
                                <strong>Next Fertilization Date:</strong>{" "}
                                {fertilizer.nextFertilizationDate &&
                                fertilizer.nextFertilizationDate !== "NA"
                                  ? new Date(
                                      fertilizer.nextFertilizationDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </div>
                              <div>
                                <strong>Total Applied:</strong>
                                <ul>
                                  {fertilizer.totalPerFertilizer.map(
                                    (item, index) => (
                                      <li key={index}>
                                        {item.type}: {item.totalApplied} kg
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No fertilizer schedules available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this fertilizer schedule?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default ManageFertilizer;