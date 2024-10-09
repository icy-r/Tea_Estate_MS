import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import axios from "../../../services/axios.js";

const ManageTransport = () => {
  const [transports, setTransports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTransport, setCurrentTransport] = useState(null);
  const [formData, setFormData] = useState({
    type: "lorry",
    dailyOccurrence: 1,
    vehicle_id: "",
    route_id: "",
  });

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Confirmation dialog states
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [transportToDelete, setTransportToDelete] = useState(null);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("/transports");
        setTransports(response.data);
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };

    fetchTransports();
  }, []);

  const handleDelete = (id) => {
    setTransportToDelete(id);
    setConfirmDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/transports/${transportToDelete}`);
      setTransports(transports.filter((transport) => transport.id !== transportToDelete));
      showSnackbar("Transport deleted successfully!");
    } catch (error) {
      console.error("Error deleting transport:", error);
      showSnackbar("Error deleting transport.");
    }
    setConfirmDeleteDialogOpen(false);
  };

  const handleUpdate = (transport) => {
    setCurrentTransport(transport);
    setFormData({
      type: transport.type,
      dailyOccurrence: transport.dailyOccurrence,
      vehicle_id: transport.vehicle_id,
      route_id: transport.route_id,
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentTransport(null);
  };

  const handleDialogSubmit = async () => {
    try {
      await axios.put(`/transports/${currentTransport.id}`, formData);
      setTransports(transports.map((transport) => (transport.id === currentTransport.id ? { ...transport, ...formData } : transport)));
      handleDialogClose();
      showSnackbar("Transport updated successfully!");
    } catch (error) {
      console.error("Error updating transport:", error);
      showSnackbar("Error updating transport.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Snackbar handling
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="manage-transport p-6  mx-auto bg-white rounded-lg ">
        <h2 className="text-2xl font-semibold mb-4">Manage Transport</h2>

        <TableContainer component={Paper}  >
          <Table>
            <TableHead className>
              <TableRow sx={{ bgcolor: '#15F5BA'}}>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Daily Occurrence</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Route ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transports.map((transport) => (
                <TableRow key={transport.id}>
                  <TableCell>{transport.id}</TableCell>
                  <TableCell>{transport.type}</TableCell>
                  <TableCell>{transport.dailyOccurrence}</TableCell>
                  <TableCell>{transport.vehicle_id}</TableCell>
                  <TableCell>{transport.route_id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#15F5BA', '&:hover': { bgcolor: '#1AACAC' },boxShadow: 'none',mr:2, color: 'black', border: 'none' }} 
                      onClick={() => handleUpdate(transport)}
                      className="mr-2 bg-color_button"
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#FA7070', '&:hover': { bgcolor: '#fd707f' } ,boxShadow: 'none',color: 'black'}} 
                      className="bg-red-500 text-white"
                      onClick={() => handleDelete(transport.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Update Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Update Transport</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the transport details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Daily Occurrence"
              name="dailyOccurrence"
              type="number"
              value={formData.dailyOccurrence}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Vehicle ID"
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              label="Route ID"
              name="route_id"
              value={formData.route_id}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Delete Dialog */}
        <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this transport?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position in top right
        TransitionComponent={(props) => (
          <div {...props} style={{ transition: "transform 0.5s ease" }} />
        )}
      />
    </>
  );
};

export default ManageTransport;
