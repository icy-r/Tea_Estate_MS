import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import {
  Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const ManageSupply = () => {
  const [supplies, setSupplies] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState(null);

  // Fetch all supplies from the backend
  const fetchDetails = async () => {
    try {
      const response = await axios.get("/supplies/");
      setSupplies(response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching supply data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdateOpen = (supply) => {
    setSelectedSupply(supply);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSupply(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/supplies/${id}`);
      setSupplies(supplies.filter((supply) => supply._id !== id));
      setAlert({ open: true, message: 'Supply deleted successfully', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: 'Error deleting supply', severity: 'error' });
    }
  };

  const handleUpdateSupply = async () => {
    try {
      await axios.put(`/supplies/${selectedSupply._id}`, selectedSupply);
      setSupplies(supplies.map((supply) => (supply._id === selectedSupply._id ? selectedSupply : supply)));
      setAlert({ open: true, message: 'Supply updated successfully', severity: 'success' });
      handleDialogClose();
    } catch (error) {
      setAlert({ open: true, message: 'Error updating supply', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupply({ ...selectedSupply, [name]: value });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mt-3 mb-8">Supply Management</h1>

      <TableContainer component={Paper}>
        <Table aria-label="supply table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#15F5BA' }}>
              <TableCell>Supply ID</TableCell>
              <TableCell>Supply Type</TableCell>
              <TableCell>Quantity (Kg/l)</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplies.length > 0 ? (
              supplies.map((supply) => (
                <TableRow key={supply._id}>
                  <TableCell>{supply.supplyId}</TableCell>
                  <TableCell>{supply.supplyType}</TableCell>
                  <TableCell>{supply.quantity}</TableCell>
                  <TableCell align="center">{new Date(supply.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#15F5BA', color: 'black', mr: 1 }}
                      onClick={() => handleUpdateOpen(supply)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#FA7070', color: 'black' }}
                      onClick={() => handleDelete(supply._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No supplies available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Supply</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the supply details below.</DialogContentText>
          {selectedSupply && (
            <>
              <TextField
                margin="dense"
                name="supplyId"
                label="Supply ID"
                type="text"
                fullWidth
                value={selectedSupply.supplyId}
                onChange={handleChange}
                disabled // Assuming Supply ID is not editable
              />
              <TextField
                margin="dense"
                name="supplyType"
                label="Supply Type"
                type="text"
                fullWidth
                value={selectedSupply.supplyType}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={selectedSupply.quantity}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="purchaseDate"
                label="Purchase Date"
                type="date"
                fullWidth
                value={selectedSupply.purchaseDate ? selectedSupply.purchaseDate.split('T')[0] : ''}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSupply} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSupply;
