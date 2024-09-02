import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../../services/axios.js';
import EmployeeComponent from './EmployeeComponent.jsx';
import { useNavigate } from 'react-router-dom';

const URL = "/empManagement";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(URL);
                setEmployees(response.data);
            } catch (error) {
                console.error("There was an error fetching employee data!", error);
            }
        };

        fetchHandler();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/employee/update/${id}`); // Navigate to update page with employee ID
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            // Update the employee list after deletion
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
        } catch (error) {
            console.error("There was an error deleting the employee!", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Management</h1>
                    <h2 className="text-xl text-gray-600 mb-8">Employee Details Page</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees && employees.map((employee) => (
                            <div key={employee._id} className="bg-white shadow-lg rounded-lg p-4">
                                <EmployeeComponent employee={employee} />
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleUpdate(employee._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeManagement;
