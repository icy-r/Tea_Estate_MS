import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteTea = ({ open, handleClose, handleConfirm, teaName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Tea</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the tea: <strong>{teaName}</strong>?
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

export default DeleteTea; 
