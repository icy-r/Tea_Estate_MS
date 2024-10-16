import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'; // Update the import statement for axios
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeUpdate = () => {
    const navigate = useNavigate();  // Initialize navigate hook
    const { id } = useParams();  // Destructuring id from useParams
  
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
  
    useEffect(() => {
        const fetchHandler = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/empManagement/${id}`);
            console.log('API Response:', response.data); // Log the full response to check its structure
      
            // Assuming the employee data should be inside the `response.data.employee`
            if (response.data) {
                setInputs(response.data);  // Remove `.employee` if data is directly under `response.data`
              }else {
              console.error("Employee data not found.");
            }
          } catch (error) {
            console.error("Error fetching employee data:", error);
          }
        };
        fetchHandler();
      }, [id]);
      
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputs({ ...inputs, [name]: value });
    };



        // Helper function to get today's date in YYYY-MM-DD format
        const getTodayDate = () => {
            const today = new Date();
            return today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
        };
    
        // Helper function to get the date one month ago from today
        const getOneMonthAgoDate = () => {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Set to one month ago
            return oneMonthAgo.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
        };
    
        const getEighteenYearsAgoDate = () => {
            const today = new Date();
            today.setFullYear(today.getFullYear() - 18); // Subtract 18 years from today
            return today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
        };

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(inputs);
      try {
        await axios.put(`http://localhost:3001/api/empManagement/${id}`, inputs);
        navigate('/admin/employee/employeeprofile');  // Navigate after successful update
      } catch (error) {
        console.error("Error updating employee data:", error);
      }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        
        try {
            // Validate the old password by making an API call
            const response = await axios.post(`http://localhost:3001/api/empManagement/validatePassword`, {
                id, 
                oldPassword
            });

            if (response.data.isValid) {
                // If the old password is valid, update the password with the new one
                await axios.put(`http://localhost:3001/api/empManagement/${id}`, { ...inputs, password: newPassword });
                navigate('/admin/employee/employeedetails');
            } else {
                setErrorMessage("Old password is incorrect.");
            }
        } catch (error) {
            console.error("Error validating password or updating employee data:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Employee</h1>
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
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <div className="mt-1">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={inputs.gender} // Controlled input
                                    onChange={handleChange}
                                    required
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select gender</option> {/* Placeholder */}
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
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
                                max={getEighteenYearsAgoDate()} // Set the max date to 18 years ago from today
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Contact No Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                pattern=".{10,12}"
                                onChange={handleChange}
                                value={inputs.contactNumber}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Designation Input */}
                        <div>
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                            <div className="mt-1">
                                <select
                                    id="designation"
                                    name="designation"
                                    value={inputs.designation} // Controlled input
                                    onChange={handleChange}
                                    required
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select designation</option> {/* Placeholder */}
                                    <option value="Employee Manager">Employee Manager</option>
                                    <option value="Labour">Labour</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Technician">Technician</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Inventory Manager">Inventory Manager</option>
                                    <option value="Field Manager">Field Manager</option>
                                    <option value="Supply Manager">Supply Manager</option>
                                    <option value="Transport Manager">Transport Manager</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="Sales Manager">Sales Manager</option>
                                    <option value="Repair Manager">Repair Manager</option>
                                </select>
                            </div>
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

    
                        {/* Date of Joining Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                onChange={handleChange}
                                value={inputs.dateOfJoining}
                                min={getOneMonthAgoDate()} // Set min date to one month ago
                                max={getTodayDate()} // Set max date to today's date
                                required
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Salary Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                onChange={handleChange}
                                value={inputs.salary}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Leaves Left Input */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Leaves Left</label>
                            <input
                                type="number"
                                name="leavesLeft"
                                value={30} // Default value
                                readOnly // Make the input read-only
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password" // Changed from 'text' to 'password' for better security
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                                readOnly
                                desabled
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {/* Password Validation Message */}
                            {/* {inputs.password && (
                                <div className="mt-1 text-sm text-red-600">
                                    {!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputs.password) && 
                                        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."}
                                </div>
                            )} */}
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
                    <div className="mt-6">
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Update Employee
                        </button>
                    </div>

                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default EmployeeUpdate;
