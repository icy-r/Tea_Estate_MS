import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, Snackbar, Alert, Typography } from "@mui/material";
import axios from "../../../services/axios.js"; // Axios instance

const CallingSupplyForm = ({ onAddSupply, onCloseDialog }) => {
    const [formValues, setFormValues] = useState({
        supplyType: '',
        quantity: '',
        status: '',
        qnumber: 0,
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [supplies, setSupplies] = useState([]);

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
            qnumber: formValues.qnumber,
        };

        try {
            await axios.post('/callingSupply/', newSupply);  // API call to create supply
            onAddSupply(newSupply);  // Add the new supply to the list in parent component
            setAlert({ open: true, message: "Calling supply added successfully!", severity: "success" });
            setFormValues({ supplyType: '', quantity: '', status: '', qnumber: 0 });  // Reset form
            onCloseDialog(); // Close dialog after success
        } catch (error) {
            setAlert({ open: true, message: "Error adding calling supply.", severity: "error" });
        }
    };

    // Close Snackbar
    const handleCloseAlert = () => {
        setAlert({ open: false, message: '', severity: 'success' });
    };

    useEffect(() => {
        const fetchSupplies = async () => {
            const response = await axios.get("/supplies/");
            setSupplies(response.data);
        };
        fetchSupplies();
    }, []);

    return (
        <div className=" flex justify-center items-center">
            <form onSubmit={handleSubmit} className="p-8  rounded-lg max-w-lg w-full">
                

                <Grid container spacing={4}>
                    {/* Supply Type */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Supply Type</InputLabel>
                            <Select
                                name="supplyType"
                                value={formValues.supplyType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {supplies.map((supply) => (
                                    <MenuItem key={supply.supplyType} value={supply.supplyType}>
                                        {supply.supplyType}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Quantity */}
                    <Grid item xs={12}>
                        <TextField
                            name="quantity"
                            label="Quantity"
                            value={formValues.quantity}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter Quantity"
                            fullWidth
                            required
                        />
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formValues.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Urgent">Urgent</MenuItem>
                                <MenuItem value="within week">Required within a week</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="outlined" color="secondary" onClick={onCloseDialog}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>

                {/* Snackbar Alert */}
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
};

export default CallingSupplyForm;
