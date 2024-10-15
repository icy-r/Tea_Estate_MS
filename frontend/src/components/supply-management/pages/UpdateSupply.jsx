import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import createSupply from '../services/axios-create.js';  // Update supply function from axios services

const UpdateSupply = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const supply = location.state.supply; // Receive supply object from the navigation state

  const [supplyData, setSupplyData] = useState({
    supplyId: supply.supplyId,
    quantity: supply.quantity,
    supplyType: supply.supplyType,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupplyData({ ...supplyData, [name]: value });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createSupply(supplyData); // Call to updateSupply with the form data
      setAlert({
        open: true,
        message: 'Supply updated successfully!',
        severity: 'success',
      });
      navigateTo('/supplies');  // Navigate back to supply list after success
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error updating supply. Please try again.',
        severity: 'error',
      });
    }
    handleDialogClose();
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: 'success' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Supply</h1>
        <form className="flex flex-col gap-6">
          <TextField
            label="Supply ID"
            name="supplyId"
            value={supplyData.supplyId}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            disabled
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={supplyData.quantity}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
         
         <TextField
            label="Supply Type"
            name="supplyType"
            value={supplyData.supplyType}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
            fullWidth
          >
            Update Supply
          </Button>
        </form>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to update the supply details?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default UpdateSupply;
