import { useEffect, useState, useRef } from 'react';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'; // Correct import
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeMoreDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const componentsRef = useRef();
    const [filteredEmployees, setFilteredEmployees] = useState([]);


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
                const response = await axios.get(`http://localhost:3001/api/empManagement/${id}`);
                if (response.data) {
                    setInputs(response.data);
                } else {
                    console.error("Employee data not found.");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to generate and download the PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
    
        doc.setFontSize(20);
        doc.text("Employee Details", 14, 22);
        
        // Prepare data for the PDF
        const pdfData = filteredEmployees.map(EmployeeDet => ([
            EmployeeDet?.firstName,
            EmployeeDet?.lastName,
            EmployeeDet?.age,
            EmployeeDet?.email,
            EmployeeDet?.contactNumber,
            EmployeeDet?._id,
    
        ]));
    
        // Add a table to the PDF
        doc.autoTable({
          head: [['First Name', 'Last Name', 'Age', 'Email', 'Contact Number', 'ID']],
          body: pdfData,
          startY: 30,
          headStyles: {
            fillColor: [21, 245, 186], // RGB color for the header background (example: blue)
            textColor: 0, // White text color for the header
            styles: {
                lineWidth: 1, // Thickness of the border
                lineColor: [0, 0, 0] // Black border color
              }
          }
        });
    
        doc.save('EmployeeDetails.pdf');
      };

    const handlePrint = useReactToPrint({
        content: () => componentsRef.current,
        documentTitle: "Employee Report",
        onAfterPrint: () => alert("Employee Report Successfully Downloaded!")
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-white-100">
            <div ref={componentsRef} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Employee Details</h1>
                <form className="space-y-4">
                    <div ref={componentsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* First Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={inputs.firstName}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        {/* Last Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={inputs.lastName}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        {/* Company ID Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company ID</label>
                            <input
                                type="text"
                                name="Id"
                                value={inputs.Id}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={inputs.email}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        {/* Age Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={inputs.age}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
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
                                        checked={inputs.gender === 'Male'}
                                        readOnly
                                        className="mr-1"
                                    />
                                    <label className="text-sm text-gray-700">Male</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={inputs.gender === 'Female'}
                                        readOnly
                                        className="mr-1"
                                    />
                                    <label className="text-sm text-gray-700">Female</label>
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={inputs.dateOfBirth}
                                max={getTodayDate()} // Set the max date to today's date
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
    
                        {/* Contact No Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact No</label>
                            <input
                                type="text"
                                name="contactNo"
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
                                value={inputs.dateOfJoining}
                                min={getTodayDate()} // Automatically set min date to today's date
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
    
                        {/* Address Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="address"
                                value={inputs.address}
                                required
                                rows="2" // You can adjust the number of rows as needed
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>
                    {/* Print Button */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm"
                        >
                            Download To Computer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeMoreDetails;
