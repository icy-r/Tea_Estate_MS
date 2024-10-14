import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import axios from "../../../services/axios.js"; // Axios instance

const CallingSupplyForm = ({ onAddSupply, onCloseDialog }) => {
    const [formValues, setFormValues] = useState({
        supplyType: '',
        quantity: '',
        status: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Validate form values
    const validateForm = () => {
        const { quantity } = formValues;
        if (quantity <= 0) {
            setAlert({ open: true, message: "Quantity must be a positive number.", severity: "error" });
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) return; // Prevent submission if validation fails

        const newSupply = {
            callingSupplyId: Date.now().toString(), // Example ID generation
            supplyType: formValues.supplyType,
            quantity: formValues.quantity,
            status: formValues.status,
        };

        try {
            await axios.post('/callingSupply/', newSupply);  // API call to create supply
            onAddSupply(newSupply);  // Add the new supply to the list in parent component
            setAlert({ open: true, message: "Calling supply added successfully!", severity: "success" });
            setFormValues({ supplyType: '', quantity: '', status: '' });
            onCloseDialog(); // Close dialog after success
        } catch (error) {
            setAlert({ open: true, message: "Error adding calling supply.", severity: "error" });
        }
    };

    // Close Snackbar
    const handleCloseAlert = () => {
        setAlert({ open: false, message: '', severity: 'success' });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Supply Type */}
            <div className="mb-4">
                <FormLabel>Supply Type</FormLabel>
                <Select
                    name="supplyType"
                    value={formValues.supplyType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <MenuItem value="fertilizer">Fertilizer</MenuItem>
                    <MenuItem value="Chemicals">Chemicals</MenuItem>
                    <MenuItem value="fuel">Fuel</MenuItem>
                </Select>
            </div>

            {/* Quantity */}
            <div className="mb-4">
                <FormLabel>Quantity</FormLabel>
                <Input
                    name="quantity"
                    value={formValues.quantity}
                    onChange={handleChange}
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            {/* Status */}
            <div className="mb-4 col-span-2">
                <FormLabel>Status</FormLabel>
                <Select
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <MenuItem value="Enable">Enable</MenuItem>
                    <MenuItem value="Disable">Disable</MenuItem>
                </Select>
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex justify-between mt-6">
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </div>

            {/* Snackbar Alert */}
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default CallingSupplyForm;
