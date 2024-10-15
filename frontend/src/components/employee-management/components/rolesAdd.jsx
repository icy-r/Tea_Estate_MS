import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert

const VacancyForm = () => {
    const navigate = useNavigate(); // Use navigate for redirection

    const [inputs, setInputs] = useState({
        title: '',
        department: '',
        location: '',
        description: '',
        employmentType: '', // Default value to one of the enum options
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);  // State to control Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState('');  // Message for the Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');  // Snackbar severity (success/error)

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then(() => {
                setSnackbarMessage('Vacancy added successfully!');  // Set success message
                setSnackbarSeverity('success');
                setOpenSnackbar(true);  // Show success Snackbar
                setTimeout(() => {
                    navigate('/admin/employee/employeedetails');  // Redirect after success
                }, 2000);  // Redirect after 2 seconds
            })
            .catch(() => {
                setSnackbarMessage('Failed to add vacancy. Please try again.');  // Set error message
                setSnackbarSeverity('error');
                setOpenSnackbar(true);  // Show error Snackbar
            });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/applicantRoles/", {
                title: String(inputs.title),
                department: String(inputs.department),
                location: String(inputs.location),
                description: String(inputs.description),
                employmentType: String(inputs.employmentType),
            });

            console.log('Response:', response.data); // Log success response
            return response.data;
        } catch (error) {
            console.error('Error adding vacancy:', error.response || error); // Log the error
            throw error;
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);  // Close Snackbar
    };

    return (
        <div className="flex justify-center bg-white-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Available Vacancies</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={inputs.title}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Department Input */}
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                            <div className="mt-1">
                                <select
                                    id="department"
                                    name="department"
                                    value={inputs.department} // Controlled input
                                    onChange={handleChange}
                                    required
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select department</option> {/* Placeholder */}
                                    <option value="Repair">Repair</option>
                                    <option value="Inventory">Inventory</option>
                                    <option value="Supply">Supply</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Product">Product</option>
                                    <option value="Harvest">Harvest</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Field">Field</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                        </div>

                        {/* Location Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                onChange={handleChange}
                                value={inputs.location}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Employment Type Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                            <select
                                name="employmentType"
                                onChange={handleChange}
                                value={inputs.employmentType}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select employment type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={inputs.description}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Add Vacancy
                        </button>
                    </div>
                </form>
            </div>

            {/* Success/Failure Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}  // Auto-hide after 4 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Positioning of the Snackbar
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default VacancyForm;
