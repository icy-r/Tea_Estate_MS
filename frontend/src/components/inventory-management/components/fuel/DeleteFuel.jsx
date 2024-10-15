import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteFuel = ({ open, handleClose, handleConfirm, fuelType }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Fuel</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the fuel type: <strong>{fuelType}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="secondary">
          Delete
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFuel; // Ensure this line is present
