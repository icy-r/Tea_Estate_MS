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
      contactNo: '',
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
          const response = await axios.get(`/empManagement/${id}`);
          if (response.data && response.data.employee) {
            setInputs(response.data.employee);
          } else {
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(inputs);
      try {
        await axios.put(`/empManagement/${id}`, inputs);
        navigate('/employeedetails');  // Navigate after successful update
      } catch (error) {
        console.error("Error updating employee data:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    );
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Employee</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Form Fields */}
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                value={inputs.firstName}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                value={inputs.lastName}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Company ID</label>
                            <input
                                type="text"
                                name="Id"
                                onChange={handleChange}
                                value={inputs.Id}
                                pattern=".{11,11}"
                                required
                                title="ID must be exactly 11 characters long"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={inputs.email}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                onChange={handleChange}
                                value={inputs.age}
                                min="18"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                onChange={handleChange}
                                value={inputs.gender}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                onChange={handleChange}
                                value={inputs.dateOfBirth}
                                max={new Date().toISOString().split('T')[0]} // Set the max date to today's date
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Contact No</label>
                            <input
                                type="text"
                                name="contactNo"
                                onChange={handleChange}
                                value={inputs.contactNo}
                                pattern=".{10,10}"
                                required
                                title="Contact Number must be exactly 10 digits long"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                onChange={handleChange}
                                value={inputs.designation}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Department</label>
                            <input
                                type="text"
                                name="department"
                                onChange={handleChange}
                                value={inputs.department}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                onChange={handleChange}
                                value={inputs.dateOfJoining}
                                max={new Date().toISOString().split('T')[0]} // Set the max date to today's date
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                onChange={handleChange}
                                value={inputs.salary}
                                min="0"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Leaves Left</label>
                            <input
                                type="number"
                                name="leavesLeft"
                                onChange={handleChange}
                                value={inputs.leavesLeft}
                                min="0"
                                max="30"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-gray-700">Address</label>
                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={inputs.address}
                                rows="3"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
                        >
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


export default EmployeeUpdate;
