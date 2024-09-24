import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { FormControl, FormLabel, Input, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const UpdateInventory = ({ open, handleClose, item, fetchDetails }) => {
    const [formValues, setFormValues] = useState({
        inventoryId: '',
        name: '',
        type: '',
        quantity: '',
        purchaseDate: '',
        minLevel: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Dark mode setting based on system preferences
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (item) {
            setFormValues({
                inventoryId: item.inventoryId,
                name: item.name,
                type: item.type,
                quantity: item.quantity,
                purchaseDate: item.purchaseDate.split('T')[0], // Format to YYYY-MM-DD
                minLevel: item.minLevel
            });
        }
    }, [item]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/inventory/${formValues.inventoryId}`, formValues);
            setAlert({
                open: true,
                message: "Inventory item updated successfully!",
                severity: "success"
            });
            fetchDetails(); // Call fetchDetails to refresh the inventory list
            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                message: "Error updating inventory item. Please try again.",
                severity: "error"
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, message: '', severity: 'success' });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Inventory Item</DialogTitle>
            <DialogContent>
                <div className={`flex items-center justify-center p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className={`w-full max-w-md shadow-lg rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Inventory ID</FormLabel>
                                <Input
                                    name="inventoryId"
                                    value={formValues.inventoryId}
                                    onChange={handleChange}
                                    required
                                    disabled
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>

                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>

                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Type</FormLabel>
                                <Input
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>

                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Quantity</FormLabel>
                                <Input
                                    name="quantity"
                                    type="number"
                                    value={formValues.quantity}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>

                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Purchase Date</FormLabel>
                                <Input
                                    name="purchaseDate"
                                    type="date"
                                    value={formValues.purchaseDate}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>

                            <FormControl className="flex flex-col">
                                <FormLabel required className={darkMode ? 'text-white' : 'text-black'}>Minimum Level</FormLabel>
                                <Input
                                    name="minLevel"
                                    type="number"
                                    value={formValues.minLevel}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                            </FormControl>
                        </form>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Back</Button>
                <Button onClick={handleSubmit} color="primary">Update</Button>
            </DialogActions>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default UpdateInventory;
