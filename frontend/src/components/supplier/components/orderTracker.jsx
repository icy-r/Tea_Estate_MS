import React, { useState } from 'react';
import StepperComponent from './stepperComponent.jsx'; // Import Stepper
import StatusUpdateForm from './statusUpdateComponent.jsx'; // Import Status Update Form
import axios from '../../../services/axios.js';
import { Paper, Typography, Box } from '@mui/material'; // Import MUI components

const OrderTracker = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(data.status || ''); // Local state for the order status

    // Function to update the order status in the database
    const updateStatus = async (newStatus) => {
        setLoading(true);
        try {
            await axios.put(`/ordersSup/${data._id}`, { status: newStatus });
            setStatus(newStatus); // Update local status
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper  style={{ padding: '20px', margin: '20px 0',border:'none',boxShadow:'none' }}> {/* Card style */}
            <Typography variant="h4" component="h1" style={{ marginBottom: '16px', textAlign: 'center' }}>
                Order Tracker
            </Typography>
            <Box style={{ marginBottom: '20px' }}>
                {/* Render Stepper and Form, passing necessary props */}
                <StepperComponent data={data} />
            </Box>

            <StatusUpdateForm
                status={status}
                setStatus={setStatus}
                updateStatus={updateStatus}
                loading={loading}
            />
        </Paper>
    );
};

export default OrderTracker;
