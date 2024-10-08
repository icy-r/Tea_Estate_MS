import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'; // Correct import
import { useNavigate } from 'react-router-dom'; // Ensure this import is correct if you're using routing

  // Set the ID of the employee to fetch
const EmployeeUpdate = ({ _id }) => {
    const navigate = useNavigate();  // Initialize navigate hook

    // State to hold employee data
    const [inputs, setInputs] = useState({
      firstName: '',
      lastName: '',
      Id: '',
      email: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      contactNumber: '',
      designation: '',
      department: '',
      dateOfJoining: '',
      salary: '',
      leavesLeft: 30,
      address: ''
    });
  
    // Fetch employee data by ID when component mounts or when _id changes
    useEffect(() => {
        const fetchHandler = async () => {
          try {
            // Fetch employee data using _id
            const response = await axios.get(`http://localhost:3001/api/empManagement/${_id}`);
            console.log('API Response:', response.data); // Log the full response to check its structure
      
            // Assuming the employee data is in response.data, set it to state
            if (response.data) {
                setInputs(response.data);  // If the data structure has an employee object, adjust accordingly
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
      }, [_id]);  // Add _id as a dependency to refetch when it changes
  
    // Update input state on change
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputs({ ...inputs, [name]: value });
    };

    // Utility function to get today's date
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Submit the updated employee data
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(inputs);
      try {
        // Update employee data by ID
        await axios.put(`http://localhost:3001/api/empManagement/${_id}`, inputs);
        navigate('/admin/employee/employeedetails');  // Navigate after successful update
      } catch (error) {
        console.error("Error updating employee data:", error);
      }
    };
    return (
        <div className="flex items-center justify-center bg-white-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">My Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* First Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                value={inputs.firstName}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Last Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                value={inputs.lastName}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Company ID Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company ID</label>
                            <input
                                type="text"
                                name="Id"
                                onChange={handleChange}
                                value={inputs.Id}
                                pattern=".{11,11}"
                                readOnly
                                required
                                title="ID must be exactly 11 characters long"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={inputs.email}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Age Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                onChange={handleChange}
                                value={inputs.age}
                                min="18"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Gender Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <div className="flex items-center space-x-4 mt-1">
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        id="male"
                                        onChange={handleChange}
                                        checked={inputs.gender === 'Male'}
                                        required
                                        className="mr-1"
                                    />
                                    <label htmlFor="male" className="text-sm text-gray-700">Male</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        id="female"
                                        onChange={handleChange}
                                        checked={inputs.gender === 'Female'}
                                        required
                                        className="mr-1"
                                    />
                                    <label htmlFor="female" className="text-sm text-gray-700">Female</label>
                                </div>
                            </div>
                        </div>
    
                        {/* Date of Birth Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                onChange={handleChange}
                                value={inputs.dateOfBirth}
                                max={getTodayDate()} // Set the max date to today's date
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Contact No Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                onChange={handleChange}
                                value={inputs.contactNumber}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Designation Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                onChange={handleChange}
                                value={inputs.designation}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Department Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <input
                                type="text"
                                name="department"
                                onChange={handleChange}
                                value={inputs.department}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Date of Joining Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                readOnly
                                onChange={handleChange}
                                value={inputs.dateOfJoining}
                                //min={getTodayDate()} // Automatically set min date to today's date
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Salary Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                onChange={handleChange}
                                value={inputs.salary}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Leaves Left Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leaves Left</label>
                            <input
                                type="number"
                                name="leavesLeft"
                                value={30} // Default value
                                readOnly // Make the input read-only
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password" // Changed from 'text' to 'password' for better security
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {/* Password Validation Message */}
                            {inputs.password && (
                                <div className="mt-1 text-sm text-red-600">
                                    {!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputs.password) && 
                                        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."}
                                </div>
                            )}
                        </div>
    
                        {/* Address Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={inputs.address}
                                required
                                rows="2" // You can adjust the number of rows as needed
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>
    
                    {/* Submit Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                        >
                            Update My Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default EmployeeUpdate;
