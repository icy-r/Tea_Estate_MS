import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false); // Delete dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Edit dialog state
  const [vehicleToDelete, setVehicleToDelete] = useState(null); // Store vehicle to delete
  const [vehicleToEdit, setVehicleToEdit] = useState({}); // Store vehicle to edit
  const navigateTo = useNavigate();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/vehicles/");
      console.log("API Response:", response.data);
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdateOpen = (vehicle) => {
    setVehicleToEdit(vehicle); // Set the vehicle data to edit
    setEditDialogOpen(true); // Open the edit dialog
  };

  const handleUpdate = async () => {
    try {
      // Send the updated vehicle data to the backend
      await axios.put(`/vehicles/${vehicleToEdit.id}`, vehicleToEdit);
      setVehicles(vehicles.map((vehicle) => (vehicle.id === vehicleToEdit.id ? vehicleToEdit : vehicle)));
      setAlert({ open: true, message: 'Vehicle updated successfully', severity: 'success' });
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setAlert({ open: true, message: 'Failed to update vehicle', severity: 'error' });
    } finally {
      setEditDialogOpen(false); // Close the edit dialog
      setTimeout(handleCloseAlert, 3000); // Close alert after 3 seconds
    }
  };

  const handleDeleteClick = (id) => {
    setVehicleToDelete(id); // Set the vehicle ID to be deleted
    setDialogOpen(true); // Open the delete dialog
  };

  const handleDelete = async () => {
    if (vehicleToDelete) {
      try {
        await axios.delete(`/vehicles/${vehicleToDelete}`);
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete));
        setAlert({ open: true, message: 'Vehicle deleted successfully', severity: 'success' });
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        setAlert({ open: true, message: 'Failed to delete vehicle', severity: 'error' });
      } finally {
        setDialogOpen(false); // Close the delete dialog after deletion attempt
        setVehicleToDelete(null); // Reset vehicle ID
        setTimeout(handleCloseAlert, 3000); // Close alert after 3 seconds
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the delete dialog without deleting
    setVehicleToDelete(null); // Reset vehicle ID
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false); // Close the edit dialog without updating
    setVehicleToEdit({}); // Reset vehicle data
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.owner_name.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.assignedDept.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.chassisNo.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.owner_address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Vehicle Management
      </Typography>

      {/* Alert for deletion feedback */}
      {alert.open && (
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          style={{ marginBottom: '20px' }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      {/* Show a loading spinner while fetching data */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#008080' }}>
                <TableCell style={{ color: 'white' }}>Vehicle ID</TableCell>
                <TableCell style={{ color: 'white' }}>Type</TableCell>
                <TableCell style={{ color: 'white' }}>Assigned Dept</TableCell>
                <TableCell style={{ color: 'white' }}>Available Status</TableCell>
                <TableCell style={{ color: 'white' }}>Chassis No</TableCell>
                <TableCell style={{ color: 'white' }}>Owner Address</TableCell>
                <TableCell style={{ color: 'white' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} hover>
                    <TableCell>{vehicle.id}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.assignedDept}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color: vehicle.status === 'Active' ? '#00C853' : '#FF5252',
                          fontWeight: 'bold',
                        }}
                      >
                        {vehicle.status === 'Active' ? 'Active' : 'Maintenance'}
                      </span>
                    </TableCell>
                    <TableCell>{vehicle.chassisNo}</TableCell>
                    <TableCell>{vehicle.owner_address}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateOpen(vehicle)} // Open edit dialog
                        style={{ marginRight: '10px', backgroundColor: '#0D294D', boxShadow: '0' }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#0D294D' }}
                        onClick={() => handleDeleteClick(vehicle.id)} // Open delete confirmation dialog
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No vehicles available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this vehicle? This action cannot be undone.
          </DialogContentText>
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

      {/* Dialog for Editing Vehicle */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the vehicle details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Vehicle Type"
            type="text"
            fullWidth
            variant="outlined"
            value={vehicleToEdit.type || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Assigned Department"
            type="text"
            fullWidth
            variant="outlined"
            value={vehicleToEdit.assignedDept || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, assignedDept: e.target.value })}
          />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={vehicleToEdit.status || 'Active'}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Chassis No"
            type="text"
            fullWidth
            variant="outlined"
            value={vehicleToEdit.chassisNo || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, chassisNo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Owner Address"
            type="text"
            fullWidth
            variant="outlined"
            value={vehicleToEdit.owner_address || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, owner_address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVehicle;
