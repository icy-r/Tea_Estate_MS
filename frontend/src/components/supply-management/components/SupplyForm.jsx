import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Select, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import axios from "../../../services/axios.js"; // Axios instance

export default function SupplyForm() {
    const [formValues, setFormValues] = useState({
        supplyId: '',
        supplierId: '',
        supplierName: '',
        purchaseDate: '',
        expirationDate: '',
        quantity: '',
        supplyType: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [darkMode, setDarkMode] = useState(false);

    // Handles system dark mode preferences
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Validate form values
    const validateForm = () => {
        const { purchaseDate, expirationDate, quantity } = formValues;

        // Check if expiration date is less than purchase date
        if (new Date(expirationDate) < new Date(purchaseDate)) {
            setAlert({ open: true, message: "Incorrect Expiration Date!", severity: "error" });
            return false;
        }

        // Check if quantity is negative
        if (quantity < 0) {
            setAlert({ open: true, message: "Incorrect Quantity!", severity: "error" });
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) return; // Prevent submission if validation fails

        try {
            await axios.post('/supplies', formValues);  // API call to create supply
            setAlert({ open: true, message: "Supply created successfully!", severity: "success" });
            setFormValues({ supplyId: '', supplierId: '', supplierName: '', purchaseDate: '', expirationDate: '', quantity: '', supplyType: '' });
        } catch (error) {
            setAlert({ open: true, message: "Error creating supply. Please try again.", severity: "error" });
        }
    };

    // Close Snackbar
    const handleCloseAlert = () => {
        setAlert({ open: false, message: '', severity: 'success' });
    };




    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                        Add Supply
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
                    {/* Supply ID */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supply ID</FormLabel>
                        <Input
                            name="supplyId"
                            value={formValues.supplyId}
                            onChange={handleChange}
                            placeholder="Supply ID"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Supplier ID */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supplier ID</FormLabel>
                        <Input
                            name="supplierId"
                            value={formValues.supplierId}
                            onChange={handleChange}
                            placeholder="Supplier ID"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Supplier Name */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supplier Name</FormLabel>
                        <Input
                            name="supplierName"
                            value={formValues.supplierName}
                            onChange={handleChange}
                            placeholder="Supplier Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Purchase Date */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Purchase Date</FormLabel>
                        <Input
                            name="purchaseDate"
                            value={formValues.purchaseDate}
                            onChange={handleChange}
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Expiration Date */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Expiration Date</FormLabel>
                        <Input
                            name="expirationDate"
                            value={formValues.expirationDate}
                            onChange={handleChange}
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Quantity</FormLabel>
                        <Input
                            name="quantity"
                            value={formValues.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Supply Type */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supply Type</FormLabel>
                        <Select
                            name="supplyType"
                            value={formValues.supplyType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <MenuItem value="fertilizer">Fertilizer</MenuItem>
                            <MenuItem value="chemicals">Chemicals</MenuItem>
                            <MenuItem value="fuel">Fuel</MenuItem>
                        </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-span-2 flex justify-between mt-6">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="bg-teal-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </Button>
                        <Button
                            type="reset"
                            onClick={() => setFormValues({ supplyId: '', supplierId: '', supplierName: '', purchaseDate: '', expirationDate: '', quantity: '', supplyType: '' })}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Clear
                        </Button>
                    </div>
                </form>

                {/* Snackbar Alert */}
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}