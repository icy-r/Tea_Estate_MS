import React from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const StatusUpdateForm = ({ status, setStatus, updateStatus, loading }) => {
    const steps = [
        'Pending',
        'Preparing',
        'Shipping',
        'Handovered'
        
    ];

    const handleUpdateClick = () => {
        updateStatus(status); // Call the update function
        window.location.reload(); // Refresh the window
    };

    return (
        <div>
            {/* Status Update Form */}
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status} // Bind Select to local status state
                    onChange={(event) => setStatus(event.target.value)} // Update local state on change
                    disabled={loading} // Disable while loading
                >
                    {steps.map((step) => (
                        <MenuItem key={step} value={step}>
                            {step}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleUpdateClick} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
            </Button>
        </div>
    );
};

export default StatusUpdateForm;
