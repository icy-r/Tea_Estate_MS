import { useEffect, useState, useRef } from 'react'; // Correctly import useRef
import React from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useReactToPrint } from "react-to-print"; // Fix the import name
import EmployeeComponent from '../components/EmployeeComponent.jsx';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; // MUI components for confirmation dialog

import jsPDF from 'jspdf';
import 'jspdf-autotable';


const URL = "/empManagement/";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // State for tracking the employee to be deleted
  const [open, setOpen] = useState(false); // State to manage the open/close of the dialog

  const navigate = useNavigate(); // Use navigate for redirection
  const componentsRef = useRef(); // Correctly use useRef

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Set initial filtered employees
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching employee data!", error);
      }
    };

    fetchHandler();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/employee/update/${id}`); // Absolute path from the root
  };

  const moredetails = (id) => {
    navigate(`/admin/employee/employeemoredetails/${id}`); // Absolute path from the root
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    const filtered = employees.filter((employee) =>
      Object.values(employee).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredEmployees(filtered);
    setNoResults(filtered.length === 0);
  };

  // const handlePrint = useReactToPrint({
  //     content: () => componentsRef.current,
  //     documentTitle: "Employee Report",
  //     onAfterPrint: () => alert("Employee Report Successfully Downloaded!")
  // });

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${URL}/${deleteId}`);
      // Update the employee list after deletion
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== deleteId)
      );
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== deleteId)
      ); // Update filtered list
      console.log("Deleted employee with ID:", deleteId);
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  // Function to generate and download the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Employee Details", 14, 22);

    // Prepare data for the PDF
    const pdfData = filteredEmployees.map((EmployeeDet) => [
      EmployeeDet?.firstName,
      EmployeeDet?.lastName,
      EmployeeDet?.department,
      EmployeeDet?.designation,
      EmployeeDet?._id,
    ]);

    // Add a table to the PDF
    doc.autoTable({
      head: [["First Name", "Last Name", "Department", "Designation", "ID"]],
      body: pdfData,
      startY: 30,
      headStyles: {
        fillColor: [21, 245, 186], // RGB color for the header background (example: blue)
        textColor: 0, // White text color for the header
        styles: {
          lineWidth: 1, // Thickness of the border
          lineColor: [0, 0, 0], // Black border color
        },
      },
    });

    doc.save("EmployeeDetails.pdf");
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog without deleting
  };

    return (
        <div className=" bg-gray-100">
            <div className="container mx-auto">


                <div className="bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Management</h1>
                    <h2 className="text-xl text-gray-600 mb-8">Employee Details Page</h2>

          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search for an employee"
            className="mb-4 py-1 text-m border rounded-md mr-1"
          />

          <button
            onClick={handleSearch}
            className="mb-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
          <button
            onClick={generatePDF}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Download
          </button>

                    {noResults ? (
                        <div>
                            <p>No Users Found</p>
                        </div>
                    ) : (
                        <div ref={componentsRef} className="overflow-x-auto">
                            <div className="overflow-y-auto" style={{ maxHeight: '450px' }}> {/* Adjust height as needed */}
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">First Name</th>
                                            <th className="py-3 px-6 text-left">Last Name</th>
                                            <th className="py-3 px-6 text-left">Department</th>
                                            <th className="py-3 px-6 text-left">Designation</th>
                                            <th className="py-3 px-6 text-left">Employee ID</th>
                                            <th className="py-3 px-6 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {filteredEmployees && filteredEmployees.map((employee) => (
                                            <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6">{employee.firstName}</td>
                                                <td className="py-3 px-6">{employee.lastName}</td>
                                                <td className="py-3 px-6">{employee.department}</td>
                                                <td className="py-3 px-6">{employee.designation}</td>
                                                <td className="py-3 px-6">{employee._id}</td>
                                                <td className="py-3 px-6 flex space-x-2">
                                                    <button
                                                        onClick={() => handleUpdate(employee._id)}
                                                        className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => moredetails(employee._id)}
                                                        className="bg-green-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    >
                                                        More Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(employee._id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


          {/* Delete Confirmation Dialog */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-confirmation-dialog"
            aria-describedby="delete-confirmation-description"
          >
            <DialogTitle id="delete-confirmation-dialog">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-confirmation-description">
                Are you sure you want to delete this employee? This action
                cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
