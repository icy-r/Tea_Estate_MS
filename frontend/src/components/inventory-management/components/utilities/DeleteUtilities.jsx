import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteUtilities = ({ open, handleClose, handleConfirm, utilityName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Utility</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the utility: <strong>{utilityName}</strong>?
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

export default DeleteUtilities;
