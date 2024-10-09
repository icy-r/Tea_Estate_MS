import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeProfile = ({ _id }) => {
    const navigate = useNavigate();

    // State to hold employee data
    const [employee, setEmployee] = useState(null);

    const handleUpdate = (id) => {
        navigate(`/admin/employee/update/${id}`); // Absolute path from the root
    };

    // Fetch employee data by ID when component mounts or when _id changes
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                // Fetch employee data using _id
                const response = await axios.get(`http://localhost:3001/api/empManagement/${_id}`);
                console.log('API Response:', response.data);
        
                // Assuming the employee data is in response.data
                if (response.data) {
                    setEmployee(response.data);  // If the data structure has an employee object, adjust accordingly
                } else {
                    console.error("Employee data not found.");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        if (_id) {
            fetchHandler();  // Call fetchHandler only if _id exists
        }
    }, [_id]);

    if (!employee) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
    }

    return (
        <div className="flex items-center justify-center bg-white-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Employee Profile</h1>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Display employee details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.firstName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.lastName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company ID</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.Id}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.age}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.gender}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.dateOfBirth}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.contactNumber}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.designation}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.department}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.dateOfJoining}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.salary}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leaves Left</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.leavesLeft}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <p className="mt-1 text-sm text-gray-600">{employee.address}</p>
                        </div>
                    </div>
                </div>
                {/* Update Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => handleUpdate(employee._id)} // Adjust the path as needed
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeProfile;
