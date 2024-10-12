import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField
} from '@mui/material';
import axios from '../../../../services/axios.js';

export default function CreateFuel({ open, onClose, fetchFuel }) {
    const [formValues, setFormValues] = useState({
        fuelId: '',
        fuelType: '',
        quantityInStock: '',
        dailyDistributionAmount: '',
        minimumLevel: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchFuelId = async () => {
            if (open) {
                try {
                    const response = await axios.get('/fuel/latest-id'); // Fetch the next fuelId
                    setFormValues((prev) => ({ 
                        ...prev, 
                        fuelId: response.data.fuelId, // Set the fetched fuelId
                        fuelType: '', // Reset other fields
                        quantityInStock: '',
                        dailyDistributionAmount: '',
                        minimumLevel: '',
                    })); 
                } catch (error) {
                    console.error("Error fetching fuel ID:", error);
                }
                setErrors({});
            }
        };

        fetchFuelId();
    }, [open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};
        if (!formValues.fuelType) validationErrors.fuelType = "Fuel Type is required";
        if (!formValues.quantityInStock || isNaN(formValues.quantityInStock)) validationErrors.quantityInStock = "Quantity must be a valid number";
        if (!formValues.dailyDistributionAmount || isNaN(formValues.dailyDistributionAmount)) validationErrors.dailyDistributionAmount = "Daily Distribution Amount must be a valid number";
        if (!formValues.minimumLevel || isNaN(formValues.minimumLevel)) validationErrors.minimumLevel = "Minimum Level must be a valid number";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post("/fuel", {
                ...formValues,
                quantityInStock: Number(formValues.quantityInStock),
                dailyDistributionAmount: Number(formValues.dailyDistributionAmount),
                minimumLevel: Number(formValues.minimumLevel),
            });
            alert('Fuel created successfully!');
            console.log("Fuel created:", response.data);

            if (fetchFuel) fetchFuel();
            
            // Clear the form after successful submission
            handleClear(); // Call handleClear to reset form values
            onClose();
        } catch (error) {
            console.error("Error saving fuel:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error saving data. Please try again.');
            }
        }
    };

    const handleClear = () => {
        setFormValues({
            fuelType: '',
            quantityInStock: '',
            dailyDistributionAmount: '',
            minimumLevel: '',
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Fuel</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel required>Fuel ID</FormLabel>
                        <TextField
                            name="fuelId"
                            value={formValues.fuelId} // Ensure fuelId is displayed
                            disabled // Disable input
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.fuelType}>
                        <FormLabel required>Fuel Type</FormLabel>
                        <Select
                            name="fuelType"
                            value={formValues.fuelType || ''} // Ensure it's always a string
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Fuel Type</MenuItem>
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Gasoline">Gasoline</MenuItem>
                            <MenuItem value="Kerosene">Kerosene</MenuItem>
                            <MenuItem value="LPG">LPG</MenuItem>
                        </Select>
                        <FormHelperText>{errors.fuelType}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.quantityInStock}>
                        <FormLabel required>Quantity in Stock</FormLabel>
                        <TextField
                            name="quantityInStock"
                            type="number"
                            value={formValues.quantityInStock || ''} // Ensure it's always a string
                            onChange={handleChange}
                            placeholder="Enter quantity in stock"
                            fullWidth
                        />
                        <FormHelperText>{errors.quantityInStock}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.dailyDistributionAmount}>
                        <FormLabel required>Daily Distribution Amount</FormLabel>
                        <TextField
                            name="dailyDistributionAmount"
                            type="number"
                            value={formValues.dailyDistributionAmount || ''} // Ensure it's always a string
                            onChange={handleChange}
                            placeholder="Enter daily distribution amount"
                            fullWidth
                        />
                        <FormHelperText>{errors.dailyDistributionAmount}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.minimumLevel}>
                        <FormLabel required>Minimum Level</FormLabel>
                        <TextField
                            name="minimumLevel"
                            type="number"
                            value={formValues.minimumLevel || ''} // Ensure it's always a string
                            onChange={handleChange}
                            placeholder="Enter minimum level"
                            fullWidth
                        />
                        <FormHelperText>{errors.minimumLevel}</FormHelperText>
                    </FormControl>

                    <DialogActions>
                        <Button type="submit" color="primary">Add</Button>
                        <Button onClick={handleClear} color="secondary">Clear</Button>
                        <Button onClick={() => { handleClear(); onClose(); }} color="default">Back</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
