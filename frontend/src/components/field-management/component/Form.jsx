import { FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material";  
import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import createField from "../services/axios-create.js";

export default function Form() {
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        location: '',
        fertilizerSchedule: '',
        area: '',
        labour: '',  // Single selection support
        cropStage: ''
    });
    const [supervisors, setSupervisors] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const response = await axios.get("/labours");
                console.log("API Response:", response.data); 
                const supervisorList = response.data.filter(labour => labour.role === "Supervisor");
                setSupervisors(supervisorList);
            } catch (error) {
                console.error("Error fetching supervisors:", error);
            }
        };
        fetchSupervisors();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("Selected Value:", value);
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            createField(formValues);
            setFormValues({
                id: '',
                name: '',
                location: '',
                fertilizerSchedule: '',
                area: '',
                labour: '',
                cropStage: ''
            });
        } catch (error) {
            console.error("Error creating field or updating labour:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="w-2/3 bg-white p-8 justify-center">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Fertilizer Schedule Details
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Field No
                            </FormLabel>
                            <Input
                                name="id"
                                value={formValues.id}
                                onChange={handleChange}
                                placeholder="Field No"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Field Name
                            </FormLabel>
                            <Input
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                placeholder="Field Name"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Location
                            </FormLabel>
                            <Input
                                name="location"
                                value={formValues.location}
                                onChange={handleChange}
                                placeholder="Location"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Fertilizer Schedule
                            </FormLabel>
                            <Input
                                name="fertilizerSchedule"
                                value={formValues.fertilizerSchedule}
                                onChange={handleChange}
                                placeholder="Fertilizer Schedule"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Area
                            </FormLabel>
                            <Input
                                name="area"
                                value={formValues.area}
                                onChange={handleChange}
                                placeholder="Area"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Supervisor
                            </FormLabel>
                            <Select
                                name="labour"
                                value={formValues.labour}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                {supervisors.map((labour) => (
                                    <MenuItem key={labour._id} value={labour.firstName}>
                                        {labour.firstName} {labour.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className="flex flex-col">
                            <FormLabel
                                required
                                className="text-sm"
                                style={{ fontSize: '1rem', color: darkMode ? 'white' : 'black' }}
                            >
                                Crop Stage
                            </FormLabel>
                            <Input
                                name="cropStage"
                                value={formValues.cropStage}
                                onChange={handleChange}
                                placeholder="Crop Stage"
                                required
                                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </FormControl>

                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
