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

export default function CreateTea({ open, onClose, fetchTea }) {
    const [formValues, setFormValues] = useState({
        teaId: '',
        teaName: '',
        teaGrade: '',
        quantityInStock: '',
        addedDate: '',
        minimumLevel: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTeaId = async () => {
            if (open) {
                try {
                    const response = await axios.get('/tea/latest-id'); // Fetch the next teaId
                    setFormValues((prev) => ({ ...prev, teaId: response.data.teaId })); // Set the teaId
                } catch (error) {
                    console.error("Error fetching tea ID:", error);
                    // Optionally handle error state or fallback logic here
                }

                // Resetting other fields and errors after fetching teaId
                setFormValues((prev) => ({
                    teaId: prev.teaId, // Keep the fetched teaId
                    teaName: '',
                    teaGrade: '',
                    quantityInStock: '',
                    addedDate: '',
                    minimumLevel: '',
                }));
                setErrors({});
            }
        };

        fetchTeaId();
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
        if (!formValues.teaName) validationErrors.teaName = "Tea Name is required";
        if (!formValues.teaGrade) validationErrors.teaGrade = "Tea Grade is required";
        if (!formValues.quantityInStock || isNaN(formValues.quantityInStock)) validationErrors.quantityInStock = "Quantity must be a valid number";
        if (!formValues.addedDate) validationErrors.addedDate = "Added Date is required";
        if (!formValues.minimumLevel || isNaN(formValues.minimumLevel)) validationErrors.minimumLevel = "Minimum Level must be a valid number";
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post("/tea", {
                ...formValues,
                quantityInStock: Number(formValues.quantityInStock),
                minimumLevel: Number(formValues.minimumLevel),
            });
            alert('Tea created successfully!');
            console.log("Tea created:", response.data);
    
            if (fetchTea) fetchTea();
            onClose();
        } catch (error) {
            console.error("Error saving tea:", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error saving data. Please try again.');
            }
        }
    };

    const handleClear = () => {
        setFormValues({
            teaName: '',
            teaGrade: '',
            quantityInStock: '',
            addedDate: '',
            minimumLevel: '',
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Tea</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel required>Tea ID</FormLabel>
                        <TextField
                            name="teaId"
                            value={formValues.teaId} // Ensure teaId is displayed
                            disabled // Disable input
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.teaName}>
                        <FormLabel required>Tea Name</FormLabel>
                        <Select
                            name="teaName"
                            value={formValues.teaName || ''} // Ensure it's always a string
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Tea Name</MenuItem>
                            <MenuItem value="BlackTea">Black Tea</MenuItem>
                            <MenuItem value="GreenTea">Green Tea</MenuItem>
                            <MenuItem value="WhiteTea">White Tea</MenuItem>
                            <MenuItem value="HerbalTea">Herbal Tea</MenuItem>
                        </Select>
                        <FormHelperText>{errors.teaName}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.teaGrade}>
                        <FormLabel required>Tea Grade</FormLabel>
                        <Select
                            name="teaGrade"
                            value={formValues.teaGrade || ''} // Ensure it's always a string
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Tea Grade</MenuItem>
                            <MenuItem value="bopf">BOPF</MenuItem>
                            <MenuItem value="bop">BOP</MenuItem>
                            <MenuItem value="dust">Dust</MenuItem>
                            <MenuItem value="superfine">Superfine</MenuItem>
                        </Select>
                        <FormHelperText>{errors.teaGrade}</FormHelperText>
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

                    <FormControl fullWidth margin="normal" error={!!errors.addedDate}>
                        <FormLabel required>Added Date</FormLabel>
                        <TextField
                            name="addedDate"
                            type="date"
                            value={formValues.addedDate || ''} // Ensure it's always a string
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
