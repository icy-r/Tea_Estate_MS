import { FormControl, FormLabel, Input, MenuItem, Select, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

export default function InventoryForm() {
    const [formValues, setFormValues] = useState({
        inventoryId: '',
        name: '',
        type: '',
        quantity: '',
        purchaseDate: '',
        minLevel: ''
    });
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Dark mode setting based on system preferences
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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
            const response = await axios.post("/inventory", formValues);
            console.log("Inventory created:", response.data);
            // Reset form after successful submission
            setFormValues({
                inventoryId: '',
                name: '',
                type: '',
                quantity: '',
                purchaseDate: '',
                minLevel: ''
            });
        } catch (error) {
            console.error("Error creating inventory:", error);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className={`w-2/3 p-8 justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                        Inventory Details
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <FormControl className="flex flex-col">
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
                        </FormControl>

                        <FormControl className="flex flex-col">
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
                                <MenuItem value="Type1">Tea</MenuItem>
                                <MenuItem value="Type2">Fertilizer</MenuItem>
                                <MenuItem value="Type3">Fuel</MenuItem>
                                <MenuItem value="Type4">Utilities</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="flex flex-col">
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
                        </FormControl>

                        <FormControl className="flex flex-col">
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
                        </FormControl>

                        <FormControl className="flex flex-col">
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
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
