import { FormControl, FormLabel, Input, MenuItem, Select, Button, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { validateInventoryForm } from '../../inventory-management/services/CreateValidations.js'; // Import the validation function

export default function InventoryForm({ selectedItem, onClose, fetchDetails }) {
    const [formValues, setFormValues] = useState({
        inventoryId: '',
        name: '',
        type: '',
        quantity: '',
        purchaseDate: '',
        minLevel: ''
    });
    const [darkMode, setDarkMode] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setFormValues(selectedItem);
        }
    }, [selectedItem]);

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

        // Validate form values using the imported function
        const validationErrors = validateInventoryForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Prevent submission if there are errors
        }

        try {
            if (selectedItem) {
                await axios.put(`/inventory/${formValues.inventoryId}`, formValues);
                console.log("Inventory updated:", formValues);
            } else {
                const response = await axios.post("/inventory", formValues);
                console.log("Inventory created:", response.data);
            }
            
            setFormValues({
                inventoryId: '',
                name: '',
                type: '',
                quantity: '',
                purchaseDate: '',
                minLevel: ''
            });

            alert('Data saved successfully!'); // Success alert

            navigate('/admin/inventory/read-inventory'); // Redirect to ReadInventory page
        } catch (error) {
            console.error("Error saving inventory:", error);
            alert('Error saving data. Please try again.'); // Error alert
        }
    };

    const handleClear = () => {
        setFormValues({
            inventoryId: '',
            name: '',
            type: '',
            quantity: '',
            purchaseDate: '',
            minLevel: ''
        });
        setErrors({});
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className={`w-2/3 p-8 justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Inventory Details
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <FormControl className="flex flex-col" error={!!errors.inventoryId}>
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Inventory ID
                            </FormLabel>
                            <Input
                                name="inventoryId"
                                value={formValues.inventoryId}
                                onChange={handleChange}
                                placeholder="Inventory ID"
                                required
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <FormHelperText>{errors.inventoryId}</FormHelperText>
                        </FormControl>

                        <FormControl className="flex flex-col" error={!!errors.name}>
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Name
                            </FormLabel>
                            <Input
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <FormHelperText>{errors.name}</FormHelperText>
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Type
                            </FormLabel>
                            <Select
                                name="type"
                                value={formValues.type}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                                required
                            >
                                <MenuItem value="Tea">Tea</MenuItem>
                                <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                                <MenuItem value="Fuel">Fuel</MenuItem>
                                <MenuItem value="Utilities">Utilities</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="flex flex-col" error={!!errors.quantity}>
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Quantity
                            </FormLabel>
                            <Input
                                name="quantity"
                                type="number"
                                value={formValues.quantity}
                                onChange={handleChange}
                                placeholder="Quantity"
                                required
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <FormHelperText>{errors.quantity}</FormHelperText>
                        </FormControl>

                        <FormControl className="flex flex-col" error={!!errors.purchaseDate}>
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Purchase Date
                            </FormLabel>
                            <Input
                                name="purchaseDate"
                                type="date"
                                value={formValues.purchaseDate}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <FormHelperText>{errors.purchaseDate}</FormHelperText>
                        </FormControl>

                        <FormControl className="flex flex-col" error={!!errors.minLevel}>
                            <FormLabel required className="text-sm" style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}>
                                Minimum Level (Reorder Level)
                            </FormLabel>
                            <Input
                                name="minLevel"
                                type="number"
                                value={formValues.minLevel}
                                onChange={handleChange}
                                placeholder="Minimum Level"
                                required
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <FormHelperText>{errors.minLevel}</FormHelperText>
                        </FormControl>

                        <div className="flex justify-between">
                            <Button type="submit" variant="contained" color="primary">
                                Save Inventory
                            </Button>
                            <Button type="button" variant="outlined" color="secondary" onClick={handleClear}>
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
