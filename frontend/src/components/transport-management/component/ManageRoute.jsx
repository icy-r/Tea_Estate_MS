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
  DialogTitle
} from '@mui/material';

const ManageRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [routeToEdit, setRouteToEdit] = useState({});
  const navigateTo = useNavigate();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/routes/");
      console.log("API Response:", response.data);
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdateOpen = (route) => {
    setRouteToEdit(route);
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/routes/${routeToEdit.id}`, routeToEdit);
      setRoutes(routes.map((route) => (route.id === routeToEdit.id ? routeToEdit : route)));
      setAlert({ open: true, message: 'Route updated successfully', severity: 'success' });
    } catch (error) {
      console.error("Error updating route:", error);
      setAlert({ open: true, message: 'Failed to update route', severity: 'error' });
    } finally {
      setEditDialogOpen(false);
      setTimeout(handleCloseAlert, 3000);
    }
  };

  const handleDeleteClick = (id) => {
    setRouteToDelete(id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (routeToDelete) {
      try {
        await axios.delete(`/routes/${routeToDelete}`);
        setRoutes(routes.filter((route) => route.id !== routeToDelete));
        setAlert({ open: true, message: 'Route deleted successfully', severity: 'success' });
      } catch (error) {
        console.error("Error deleting route:", error);
        setAlert({ open: true, message: 'Failed to delete route', severity: 'error' });
      } finally {
        setDialogOpen(false);
        setRouteToDelete(null);
        setTimeout(handleCloseAlert, 3000);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRouteToDelete(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setRouteToEdit({});
  };

  const filteredRoutes = routes.filter((route) =>
    route.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Route Management
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
              <TableRow style={{ backgroundColor: '#15F5BA'}}>
                <TableCell style={{  }}>Route ID</TableCell>
                <TableCell style={{}}>Distance (km)</TableCell>
                <TableCell style={{ }}>Trips Per Day Needed</TableCell>
                <TableCell style={{  }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <TableRow key={route.id} hover>
                    <TableCell>{route.id}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell>{route.tripsPerDayNeeded}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdateOpen(route)}
                        style={{ marginRight: '10px', backgroundColor: '#15F5BA', boxShadow: 'none', color: 'black'}}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#FA7070', color: 'black', boxShadow: 'none' }}
                        onClick={() => handleDeleteClick(route.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No routes available
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
            Are you sure you want to delete this route? This action cannot be undone.
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

      {/* Dialog for Editing Route */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Route</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the route details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Distance (km)"
            type="number"
            fullWidth
            variant="outlined"
            value={routeToEdit.distance || ''}
            onChange={(e) => setRouteToEdit({ ...routeToEdit, distance: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Trips Per Day Needed"
            type="number"
            fullWidth
            variant="outlined"
            value={routeToEdit.tripsPerDayNeeded || ''}
            onChange={(e) => setRouteToEdit({ ...routeToEdit, tripsPerDayNeeded: e.target.value })}
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

export default ManageRoute;
