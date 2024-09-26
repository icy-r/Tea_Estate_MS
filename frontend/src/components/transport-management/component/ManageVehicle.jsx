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
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToEdit, setVehicleToEdit] = useState({});
  
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
    setVehicleToEdit(vehicle);
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/vehicles/${vehicleToEdit.id}`, vehicleToEdit);
      setVehicles(vehicles.map((vehicle) => (vehicle.id === vehicleToEdit.id ? vehicleToEdit : vehicle)));
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
        await axios.put(`/vehicles/${vehicleToDelete}`);
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete));
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
    const matchesSearch = (searchOptions.searchById && vehicle.id.toString().includes(search)) ||
                          (searchOptions.searchByType && vehicle.type.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByDept && vehicle.assignedDept.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByChassis && vehicle.chassisNo.toLowerCase().includes(search.toLowerCase())) ||
                          (searchOptions.searchByAddress && vehicle.owner_address.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = !statusFilter || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Function to generate and download the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Vehicle Report", 14, 22);
    
    // Prepare data for the PDF
    const pdfData = filteredVehicles.map(vehicle => ([
      vehicle.id,
      vehicle.type,
      vehicle.assignedDept,
      vehicle.status,
      vehicle.owner_address
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#15F5BA' }}>
                <TableCell style={{  }}>ID</TableCell>
                <TableCell style={{  }}>Type</TableCell>
                <TableCell style={{  }}>Assigned Dept</TableCell>
                <TableCell style={{  }}>Status</TableCell>
                <TableCell style={{  }}>Owner Address</TableCell>
                <TableCell style={{  }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.assignedDept}</TableCell>
                  <TableCell>{vehicle.status}</TableCell>
                  <TableCell>{vehicle.owner_address}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleUpdateOpen(vehicle)}
                       sx={{ bgcolor: '#15F5BA', '&:hover': { bgcolor: '#1AACAC' },boxShadow: 'none',mr:2, color: 'black', border: 'none' }} 
                      >
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClick(vehicle.id)}
                       sx={{ bgcolor: '#FA7070', border:'none','&:hover': { bgcolor: '#BF4010',boxShadow:'none' ,border:'none'} ,boxShadow: 'none',color: 'black'}}>
  
                    
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this vehicle?
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