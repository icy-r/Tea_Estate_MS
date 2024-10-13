import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteInventory = ({ open, handleClose, handleConfirm, itemName }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Inventory Item</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete "{itemName}" from the inventory?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">No</Button>
                <Button onClick={handleConfirm} color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteInventory;
