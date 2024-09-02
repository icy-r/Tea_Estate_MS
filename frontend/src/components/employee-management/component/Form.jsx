import { useState } from 'react';
import React from 'react';


const EmployeeAdd = () => {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        Id: "",
        email: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        contactNo: "",
        designation: "",
        department: "",
        dateOfJoining: "",
        salary: "",
        leavesLeft:"",
        address: "",

    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Automatically set the minimum date to today's date
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history('EmployeeDetails'));
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:3001/api/empManagement/", {
            firstName: String(inputs.firstName),
            lastName: String(inputs.lastName),
            Id: String(inputs.Id),
            email: String(inputs.email),
            age: Number(inputs.age),
            gender: String(inputs.gender),  
            dateOfBirth: String(inputs.dateOfBirth),
            contactNo: String(inputs.contactNo),
            designation: String(inputs.designation),
            department: String(inputs.department),
            dateOfJoining: String(inputs.dateOfJoining),
            salary: Number(inputs.salary),
            leavesLeft: Number(inputs.leavesLeft),
            address: String(inputs.address),

        }).then(res => res.data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Employee</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Add employee form */}
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
                                max={getTodayDate()} // Set the max date to today's date
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
                                required
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
                                min={getTodayDate()} // Automatically set min date to today's date
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
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Leaves Left</label>
                            <input
                                type="number"
                                name="leavesLeft"
                                value={30}  // Default value
                                readOnly  // Make the input read-only
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>


                        <div>
                            <label className="block text-gray-700">Address</label>
                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={inputs.address}
                                required
                                rows="2"  // You can adjust the number of rows as needed
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            ></textarea>
                        </div>

                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAdd;
