import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
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
  IconButton,
  FormControl,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import jsPDF from 'jspdf';
import CloseIcon from '@mui/icons-material/Close';
import 'jspdf-autotable';
import VehiclePortal from './vehiclePortal.jsx';

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToEdit, setVehicleToEdit] = useState({});
  const [vehiclePortalOpen, setVehiclePortalOpen] = useState(false);  // State for portal dialog
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const handleViewDetails = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setVehiclePortalOpen(true); // Open the portal in a dialog
  };

  const handleCloseVehiclePortal = () => {
    setVehiclePortalOpen(false); // Close the portal dialog
  };
  
  // State for search options
  const [searchOptions, setSearchOptions] = useState({
    searchById: true,
    searchByType: false,
    searchByDept: false,
    searchByChassis: false,
    searchByAddress: false,
  });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/vehicles/");
      if (response.data) {
        setVehicles(response.data);
        console.log("Vehicles:", vehicles);
      }
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
    setVehicleToEdit(vehicle || {});
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/vehicles/${vehicleToEdit?.id}`, vehicleToEdit);
      setVehicles(vehicles.map((vehicle) => (vehicle?.id === vehicleToEdit?.id ? vehicleToEdit : vehicle)));
      setAlert({ open: true, message: 'Vehicle updated successfully', severity: 'success' });
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setAlert({ open: true, message: 'Failed to update vehicle', severity: 'error' });
    } finally {
      setEditDialogOpen(false);
      setTimeout(handleCloseAlert, 3000);
    }
  };

  const handleDeleteClick = (id) => {
    setVehicleToDelete(id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (vehicleToDelete) {
      try {
        await axios.delete(`/vehicles/${vehicleToDelete}`);
        setVehicles(vehicles.filter((vehicle) => vehicle?.id !== vehicleToDelete));
        setAlert({ open: true, message: 'Vehicle deleted successfully', severity: 'success' });
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        setAlert({ open: true, message: 'Failed to delete vehicle', severity: 'error' });
      } finally {
        setDialogOpen(false);
        setVehicleToDelete(null);
        setTimeout(handleCloseAlert, 3000);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setVehicleToDelete(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setVehicleToEdit({});
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = (searchOptions.searchById && vehicle?.id?.toString().includes(search)) ||
                          (searchOptions.searchByType && vehicle?.type?.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByDept && vehicle?.assignedDept?.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByChassis && vehicle?.chassisNo?.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByAddress && vehicle?.owner_address?.toLowerCase().includes(search.toLowerCase()));
  
    const matchesStatus = !statusFilter || vehicle?.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  
  // Function to generate and download the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Vehicle Report", 14, 22);
    
    // Prepare data for the PDF
    const pdfData = filteredVehicles.map(vehicle => ([
      vehicle?.id,
      vehicle?.type,
      vehicle?.assignedDept,
      vehicle?.status,
      vehicle?.owner_address
    ]));

    // Add a table to the PDF
    doc.autoTable({
      head: [['Vehicle ID', 'Type', 'Assigned Dept', 'Status', 'Owner Address']],
      body: pdfData,
      startY: 30,
    });

    // Save the PDF
    doc.save("vehicle_report.pdf");
  };

  return (
    <div className="p-8">
    
      {alert.open && (
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          style={{ marginBottom: '20px' }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Search and Status Input Row */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Checkboxes for search options */}
      <div style={{ marginBottom: '20px' }}>
        <FormControlLabel
          control={<Checkbox checked={searchOptions.searchById} onChange={(e) => setSearchOptions({ ...searchOptions, searchById: e.target.checked })} />}
          label="Search by ID"
        />
        <FormControlLabel
          control={<Checkbox checked={searchOptions.searchByType} onChange={(e) => setSearchOptions({ ...searchOptions, searchByType: e.target.checked })} />}
          label="Search by Type"
        />
        <FormControlLabel
          control={<Checkbox checked={searchOptions.searchByDept} onChange={(e) => setSearchOptions({ ...searchOptions, searchByDept: e.target.checked })} />}
          label="Search by Assigned Dept"
        />
        <FormControlLabel
          control={<Checkbox checked={searchOptions.searchByChassis} onChange={(e) => setSearchOptions({ ...searchOptions, searchByChassis: e.target.checked })} />}
          label="Search by Chassis No"
        />
        <FormControlLabel
          control={<Checkbox checked={searchOptions.searchByAddress} onChange={(e) => setSearchOptions({ ...searchOptions, searchByAddress: e.target.checked })} />}
          label="Search by Owner Address"
        />
      </div>

      {/* Download Report Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={generatePDF} 
        sx={{ 
          marginBottom: '20px', 
          backgroundColor: '#15F5BA', 
          color: 'black', 
          boxShadow: 'none', 
          '&:hover': { 
            backgroundColor: '#1AACAC',
            boxShadow: 'none', 
          } 
        }}
      >
        Download Report
      </Button>

      {/* Show a loading spinner while fetching data */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color:'#15F5BA'}}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Assigned Dept</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle?.id}>
                  <TableCell>{vehicle?.id || 'N/A'}</TableCell>
                  <TableCell>{vehicle?.type || 'N/A'}</TableCell>
                  <TableCell>{vehicle?.assignedDept || 'N/A'}</TableCell>
                  <TableCell>{vehicle?.status || 'N/A'}</TableCell>
                  <TableCell>{vehicle?.owner_address || 'N/A'}</TableCell>
                  <TableCell>

                    <Button
                        onClick={() => handleViewDetails(vehicle.id)}
                        variant="outlined"
                        style={{ marginRight: '10px' }}
                    >
                        View Details
                    </Button>

                    <Button onClick={() => handleUpdateOpen(vehicle)} variant="outlined" style={{ marginRight: '10px' }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(vehicle?.id)} variant="contained" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Vehicle</DialogTitle>
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

      {/* Edit Vehicle Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          {/* Fields for editing the vehicle */}
          <TextField
            label="Type"
            fullWidth
            margin="normal"
            value={vehicleToEdit?.type || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, type: e.target.value })}
          />
          <TextField
            label="Assigned Dept"
            fullWidth
            margin="normal"
            value={vehicleToEdit?.assignedDept || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, assignedDept: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={vehicleToEdit?.status || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, status: e.target.value })}
          />
          <TextField
            label="Owner Address"
            fullWidth
            margin="normal"
            value={vehicleToEdit?.owner_address || ''}
            onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, owner_address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


           {/* Dialog for VehiclePortal */}
           <Dialog
        open={vehiclePortalOpen}
        onClose={handleCloseVehiclePortal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Vehicle Details
          <IconButton
            aria-label="close"
            onClick={handleCloseVehiclePortal}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <VehiclePortal vehicle_id={selectedVehicleId} isSearchOpen={false} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVehiclePortal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVehicle;
