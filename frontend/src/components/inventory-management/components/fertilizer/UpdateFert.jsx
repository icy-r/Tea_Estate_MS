import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    TextField,
    FormHelperText
} from '@mui/material';

const UpdateFert = ({ open, handleClose, item, fetchFertDetails }) => {
    const [formValues, setFormValues] = useState({
        fertilizerId: '',
        fertilizerName: '',
        fertilizerType: '',
        quantityInStock: '',
        dailyDistributionAmount: '',
        minimumLevel: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (item) {
            setFormValues({
                fertilizerId: item.fertilizerId,
                fertilizerName: item.fertilizerName,
                fertilizerType: item.fertilizerType,
                quantityInStock: item.quantityInStock,
                dailyDistributionAmount: item.dailyDistributionAmount,
                minimumLevel: item.minimumLevel
            });
        }
    }, [item]);

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
            await axios.put(`/fert/${formValues.fertilizerId}`, formValues);
            alert("Fertilizer item updated successfully!");
            fetchFertDetails();
            handleClose(); // Close the dialog
        } catch (error) {
            console.error('Error updating fertilizer item:', error);
            alert("Error updating fertilizer item. Please try again.");
        }
    };

    const handleClear = () => {
        setFormValues((prevValues) => ({
            ...prevValues,
            quantityInStock: '',
            dailyDistributionAmount: '',
            minimumLevel: ''
        }));
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Fertilizer Item</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Fertilizer ID</FormLabel>
                        <TextField
                            name="fertilizerId"
                            value={formValues.fertilizerId}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Fertilizer Name</FormLabel>
                        <TextField
                            name="fertilizerName"
                            value={formValues.fertilizerName}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Fertilizer Type</FormLabel>
                        <TextField
                            name="fertilizerType"
                            value={formValues.fertilizerType}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.quantityInStock}>
                        <FormLabel required>Quantity in Stock</FormLabel>
                        <TextField
                            name="quantityInStock"
                            type="number"
                            value={formValues.quantityInStock}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormHelperText>{errors.quantityInStock}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.dailyDistributionAmount}>
                        <FormLabel required>Daily Distribution Amount</FormLabel>
                        <TextField
                            name="dailyDistributionAmount"
                            type="number"
                            value={formValues.dailyDistributionAmount}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormHelperText>{errors.dailyDistributionAmount}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.minimumLevel}>
                        <FormLabel required>Minimum Level</FormLabel>
                        <TextField
                            name="minimumLevel"
                            type="number"
                            value={formValues.minimumLevel}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormHelperText>{errors.minimumLevel}</FormHelperText>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="primary">Update</Button>
                <Button onClick={handleClear} color="secondary">Clear</Button>
                <Button onClick={handleClose} color="default">Back</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateFert;
