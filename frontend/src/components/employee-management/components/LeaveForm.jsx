import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';
import { Snackbar, Alert } from '@mui/material';

const LeaveForm = ({ _id }) => {
    const navigate = useNavigate(); // Use navigate for redirection
    const { id } = useParams();

    const [inputs, setInputs] = useState({
        Name: '',
        Reason: '',
        DateFrom: '',
        DateTo: '',
        Email: '',
        type: ''
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);  // State to control the success message
    const [snackbarMessage, setSnackbarMessage] = useState('');  // Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');  // Snackbar severity (success/error)

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/empManagement/${_id}`);
                console.log('API Response:', response.data); // Log the full response to check its structure

                // Assuming the employee data should be inside the `response.data.employee`
                if (response.data) {
                    setInputs(response.data);  // Remove `.employee` if data is directly under `response.data`
                } else {
                    console.error("Employee data not found.");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchHandler();
    }, [_id]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then(() => {
                setSnackbarMessage("Leave application submitted successfully!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);  // Show success message
                setTimeout(() => {
                    navigate('/admin/employee/employeeprofile');  // Redirect after success
                }, 2000);  // Redirect after 2 seconds
            })
            .catch((error) => {
                setSnackbarMessage("Failed to submit leave application. Please try again.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);  // Show error message
            });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/employeeProfile/", {
                Name: String(inputs.Name),
                Reason: String(inputs.Reason),
                DateFrom: String(inputs.DateFrom),
                DateTo: String(inputs.DateTo),
                Email: String(inputs.Email),
                type: String(inputs.type),
            });

            console.log('Response:', response.data); // Log success response
            return response.data;
        } catch (error) {
            console.error('Error adding employee:', error.response || error); // Log the error
            throw error;
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);  // Close the snackbar
    };

    return (
        <div className="flex justify-center bg-white-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-5">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Leave Application</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="Name"
                                onChange={handleChange}
                                value={inputs.Name}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="Email"
                                onChange={handleChange}
                                value={inputs.Email}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Date From Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leave Start Date</label>
                            <input
                                type="date"
                                name="DateFrom"
                                onChange={handleChange}
                                value={inputs.DateFrom}
                                min={getTodayDate()}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Date To Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leave End Date</label>
                            <input
                                type="date"
                                name="DateTo"
                                onChange={handleChange}
                                value={inputs.DateTo}
                                min={getTodayDate()}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Type Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type of Leave</label>
                            <select
                                name="type"
                                onChange={handleChange}
                                value={inputs.type}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select leave type</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Vacation Leave">Vacation Leave</option>
                                <option value="Personal Leave">Personal Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Reason Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Reason for Leave</label>
                            <textarea
                                name="Reason"
                                onChange={handleChange}
                                value={inputs.Reason}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Submit Leave Application
                        </button>
                    </div>
                </form>
            </div>

            {/* Success/Failure Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}  // Close after 4 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default LeaveForm;
