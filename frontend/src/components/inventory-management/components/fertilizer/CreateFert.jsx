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
import axios from "../../../../services/axios.js";

export default function CreateFert({ open, onClose, fetchFert }) {
    const [formValues, setFormValues] = useState({
        fertilizerId: '',
        fertilizerName: '',
        fertilizerType: '',
        quantityInStock: '',
        dailyDistributionAmount: '',
        minimumLevel: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchFertId = async () => {
            if (open) {
                try {
                    const response = await axios.get('/fert/latest-id');
                    setFormValues((prev) => ({ ...prev, fertilizerId: response.data.fertilizerId }));
                } catch (error) {
                    console.error("Error fetching fertilizer ID:", error);
                }

                setFormValues((prev) => ({
                    fertilizerId: prev.fertilizerId,
                    fertilizerName: '',
                    fertilizerType: '',
                    quantityInStock: '',
                    dailyDistributionAmount: '',
                    minimumLevel: '',
                }));
                setErrors({});
            }
        };

        fetchFertId();
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
        if (!formValues.fertilizerName) validationErrors.fertilizerName = "Fertilizer Name is required";
        if (!formValues.fertilizerType) validationErrors.fertilizerType = "Fertilizer Type is required";
        if (!formValues.quantityInStock || isNaN(formValues.quantityInStock)) validationErrors.quantityInStock = "Quantity must be a valid number";
        if (!formValues.dailyDistributionAmount || isNaN(formValues.dailyDistributionAmount)) validationErrors.dailyDistributionAmount = "Daily Distribution Amount must be a valid number";
        if (!formValues.minimumLevel || isNaN(formValues.minimumLevel)) validationErrors.minimumLevel = "Minimum Level must be a valid number";
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post("/fert", {
                ...formValues,
                quantityInStock: Number(formValues.quantityInStock),
                dailyDistributionAmount: Number(formValues.dailyDistributionAmount),
                minimumLevel: Number(formValues.minimumLevel),
            });
            alert('Fertilizer created successfully!');
            console.log("Fertilizer created:", response.data);
    
            if (fetchFert) fetchFert();
            onClose();
        } catch (error) {
            console.error("Error saving fertilizer:", error);
            
            // Check for specific error regarding existing fertilizer
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); // Alert for existing fertilizer
            } else {
                alert('Error saving data. Please try again.');
            }
        }
    };
    

    const handleClear = () => {
        setFormValues({
            fertilizerName: '',
            fertilizerType: '',
            quantityInStock: '',
            dailyDistributionAmount: '',
            minimumLevel: '',
        });
        setErrors({});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Fertilizer</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel required>Fertilizer ID</FormLabel>
                        <TextField
                            name="fertilizerId"
                            value={formValues.fertilizerId}
                            disabled
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.fertilizerName}>
                        <FormLabel required>Fertilizer Name</FormLabel>
                        <Select
                            name="fertilizerName"
                            value={formValues.fertilizerName || ''}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Fertilizer Name</MenuItem>
                            <MenuItem value="Wilsons">Wilsons</MenuItem>
                            <MenuItem value="Mosaic">Mosaic</MenuItem>
                            <MenuItem value="Andersons">Andersons</MenuItem>
                            <MenuItem value="Southern States">Southern States</MenuItem>
                        </Select>
                        <FormHelperText>{errors.fertilizerName}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.fertilizerType}>
                        <FormLabel required>Fertilizer Type</FormLabel>
                        <Select
                            name="fertilizerType"
                            value={formValues.fertilizerType || ''}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Fertilizer Type</MenuItem>
                            <MenuItem value="potassium">Potassium</MenuItem>
                            <MenuItem value="nitrogen">Nitrogen</MenuItem>
                            <MenuItem value="phosphorous">Phosphorous</MenuItem>
                            <MenuItem value="organic">Organic</MenuItem>
                        </Select>
                        <FormHelperText>{errors.fertilizerType}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={!!errors.quantityInStock}>
                        <FormLabel required>Quantity in Stock</FormLabel>
                        <TextField
                            name="quantityInStock"
                            type="number"
                            value={formValues.quantityInStock || ''}
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
                            value={formValues.dailyDistributionAmount || ''}
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
                            value={formValues.minimumLevel || ''}
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
