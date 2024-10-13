// DeleteFert.jsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteFert = ({ open, handleClose, handleConfirm, fertilizerName }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Fertilizer</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete {fertilizerName}?</p>
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

export default DeleteFert; // Default export
