import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "../../../../services/axios.js";

export default function CreateUtility({ open, onClose, fetchUtilities }) {
    const [formValues, setFormValues] = useState({
        utilityId: '',
        utilityName: '',
        utilityType: '',
        quantityInStock: '',
        dailyDistributionAmount: '',
        minimumLevel: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUtilityId = async () => {
            if (open) {
                try {
                    const response = await axios.get('/utilities/latest-id'); // Fetch the next utilityId
                    setFormValues((prev) => ({ ...prev, utilityId: response.data.utilityId })); // Set the utilityId
                } catch (error) {
                    console.error("Error fetching utility ID:", error);
                }

                // Resetting other fields and errors after fetching utilityId
                setFormValues((prev) => ({
                    utilityId: prev.utilityId, // Keep the fetched utilityId
                    utilityName: '',
                    utilityType: '',
                    quantityInStock: '',
                    dailyDistributionAmount: '',
                    minimumLevel: '',
                }));
                setErrors({});
            }
        };

        fetchUtilityId();
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
        if (!formValues.utilityName) validationErrors.utilityName = "Utility Name is required";
        if (!formValues.utilityType) validationErrors.utilityType = "Utility Type is required";
        if (!formValues.quantityInStock || isNaN(formValues.quantityInStock) || formValues.quantityInStock <= 0) {
            validationErrors.quantityInStock = "Quantity must be a positive number";
        }
        if (!formValues.dailyDistributionAmount || isNaN(formValues.dailyDistributionAmount) || formValues.dailyDistributionAmount <= 0) {
            validationErrors.dailyDistributionAmount = "Distribution Amount must be a positive number";
        }
        if (!formValues.minimumLevel || isNaN(formValues.minimumLevel) || formValues.minimumLevel <= 0) {
            validationErrors.minimumLevel = "Minimum Level must be a positive number";
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post("/utilities", {
                ...formValues,
                quantityInStock: Number(formValues.quantityInStock),
                dailyDistributionAmount: Number(formValues.dailyDistributionAmount),
                minimumLevel: Number(formValues.minimumLevel),
            });
            alert('Utility created successfully!');
            console.log("Utility created:", response.data);
    
            if (fetchUtilities) fetchUtilities();
            onClose();
        } catch (error) {
            console.error("Error saving utility:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error saving data. Please try again.');
            }
        }
    };

    const handleClear = () => {
        setFormValues({
            utilityId: formValues.utilityId,
            utilityName: '',
            utilityType: '',
            quantityInStock: '',
            dailyDistributionAmount: '',
            minimumLevel: '',
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Utility</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel required>Utility ID</FormLabel>
                        <TextField
                            name="utilityId"
                            value={formValues.utilityId} // Ensure utilityId is displayed
                            disabled // Disable input
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.utilityName}>
                        <FormLabel required>Utility Name</FormLabel>
                        <TextField
                            name="utilityName"
                            value={formValues.utilityName || ''}
                            onChange={handleChange}
                            placeholder="Enter utility name"
                            fullWidth
                        />
                        <FormHelperText>{errors.utilityName}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.utilityType}>
                        <FormLabel required>Utility Type</FormLabel>
                        <Select
                            name="utilityType"
                            value={formValues.utilityType || ''} // Ensure it's always a string
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Utility Type</MenuItem>
                            <MenuItem value="Daily Utilities">Daily Utilities</MenuItem>
                            <MenuItem value="Processing Utilities">Processing Utilities</MenuItem>
                            <MenuItem value="Staff Utilities">Staff Utilities</MenuItem>
                            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                        </Select>
                        <FormHelperText>{errors.utilityType}</FormHelperText>
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
                        <Button onClick={onClose} color="default">Back</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
