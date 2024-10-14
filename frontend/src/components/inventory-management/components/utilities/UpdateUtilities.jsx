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

const UpdateUtility = ({ open, handleClose, utility, fetchUtilityDetails }) => {
    const [formValues, setFormValues] = useState({
        utilityId: '',
        utilityName: '',
        utilityType: '',
        quantityInStock: '',
        dailyDistributionAmount: '',
        minimumLevel: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (utility) {
            setFormValues({
                utilityId: utility.utilityId,
                utilityName: utility.utilityName,
                utilityType: utility.utilityType,
                quantityInStock: utility.quantityInStock,
                dailyDistributionAmount: utility.dailyDistributionAmount,
                minimumLevel: utility.minimumLevel
            });
        }
    }, [utility]);

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
            await axios.put(`/utilities/${formValues.utilityId}`, formValues);
            alert("Utility item updated successfully!"); // Basic alert
            fetchUtilityDetails();
            handleClose(); // Close the dialog
        } catch (error) {
            console.error('Error updating utility item:', error);
            alert("Error updating utility item. Please try again."); // Basic alert
        }
    };

    const handleClear = () => {
        setFormValues({
            utilityId: formValues.utilityId,
            utilityName: formValues.utilityName,
            utilityType: formValues.utilityType,
            quantityInStock: '',
            dailyDistributionAmount: '',
            minimumLevel: ''
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Utility Item</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Utility ID</FormLabel>
                        <TextField
                            name="utilityId"
                            value={formValues.utilityId}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Utility Name</FormLabel>
                        <TextField
                            name="utilityName"
                            value={formValues.utilityName}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Utility Type</FormLabel>
                        <TextField
                            name="utilityType"
                            value={formValues.utilityType}
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

export default UpdateUtility;
