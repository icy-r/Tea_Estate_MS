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

const UpdateTea = ({ open, handleClose, item, fetchTeaDetails }) => {
    const [formValues, setFormValues] = useState({
        teaId: '',
        teaName: '',
        teaGrade: '',
        quantityInStock: '',
        minimumLevel: '',
        addedDate: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (item) {
            setFormValues({
                teaId: item.teaId,
                teaName: item.teaName,
                teaGrade: item.teaGrade,
                quantityInStock: item.quantityInStock,
                addedDate: item.addedDate.split('T')[0],
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
        if (!formValues.addedDate) {
            validationErrors.addedDate = "Added Date is required"; // Ensure this validation is present
        }
        if (!formValues.minimumLevel || isNaN(formValues.minimumLevel) || formValues.minimumLevel <= 0) {
            validationErrors.minimumLevel = "Minimum Level must be a positive number";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put(`/tea/${formValues.teaId}`, formValues);
            alert("Tea item updated successfully!"); // Basic alert
            fetchTeaDetails();
            handleClose(); // Close the dialog
        } catch (error) {
            console.error('Error updating tea item:', error);
            alert("Error updating tea item. Please try again."); // Basic alert
        }
    };

    const handleClear = () => {
        setFormValues({
            teaId: formValues.teaId, // Keep the teaId
            teaName: formValues.teaName, // Keep the teaName
            teaGrade: formValues.teaGrade, // Keep the teaGrade
            quantityInStock: '',
            minimumLevel: '',
            addedDate: ''
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Tea Item</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Tea ID</FormLabel>
                        <TextField
                            name="teaId"
                            value={formValues.teaId}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Tea Name</FormLabel>
                        <TextField
                            name="teaName"
                            value={formValues.teaName}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Tea Grade</FormLabel>
                        <TextField
                            name="teaGrade"
                            value={formValues.teaGrade}
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

                    <FormControl fullWidth margin="normal" error={!!errors.addedDate}>
                        <FormLabel required>Added Date</FormLabel>
                        <TextField
                            name="addedDate"
                            type="date"
                            value={formValues.addedDate}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormHelperText>{errors.addedDate}</FormHelperText>
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

export default UpdateTea;
