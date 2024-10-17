import { useEffect, useState, useRef } from 'react';
import React from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import EmployeeComponent from '../components/EmployeeComponent.jsx';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const URL = "/empManagement/";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  const navigate = useNavigate();
  const componentsRef = useRef();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setEmployees(response.data);
        setFilteredEmployees(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching employee data!", error);
      }
    };

    fetchHandler();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/employee/update/${id}`);
  };

  const moredetails = (id) => {
    navigate(`/admin/employee/employeemoredetails/${id}`);
  };

  const handleSearch = () => {
    const filtered = employees.filter((employee) =>
      Object.values(employee).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredEmployees(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${URL}/${deleteId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== deleteId));
      setFilteredEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== deleteId));
      console.log("Deleted employee with ID:", deleteId);
      setOpen(false);
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Employee Details", 14, 22);
    const pdfData = filteredEmployees.map((EmployeeDet) => [
      EmployeeDet?.firstName,
      EmployeeDet?.lastName,
      EmployeeDet?.department,
      EmployeeDet?.designation,
      EmployeeDet?._id,
    ]);
    doc.autoTable({
      head: [["First Name", "Last Name", "Department", "Designation", "ID"]],
      body: pdfData,
      startY: 30,
      headStyles: {
        fillColor: [21, 245, 186],
        textColor: 0,
        styles: {
          lineWidth: 1,
          lineColor: [0, 0, 0],
        },
      },
    });
    doc.save("EmployeeDetails.pdf");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to filter employees by role
  const filterByRole = (role) => {
    setRoleFilter(role);

    const filtered = employees.filter((employee) => {
      if (role === "Manager") {
        const designationWords = employee.designation?.split(" ");
        return designationWords?.length > 1 && designationWords[1].toLowerCase() === "manager";
      }
      return employee.designation === role;
    });

    setFilteredEmployees(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Employee Management</h1>
          <h2 className="text-lg text-gray-600 mb-5">Employee Details Page</h2>

          {/* Search Bar, Role Filter Buttons, and Download Button on the same line */}
          <div className="mb-4 flex flex-wrap items-center space-x-4">
            {/* Search Bar */}
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search for an employee"
              className="py-2 text-m border rounded-md px-4"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>

            {/* Role Filter Buttons */}

            <Button onClick={() => filterByRole("Manager")} variant="contained" className="bg-blue-500 text-white">
              Manager
            </Button>
            <Button onClick={() => filterByRole("Labour")} variant="contained" className="bg-blue-500 text-white">
              Labour
            </Button>
            <Button onClick={() => filterByRole("Driver")} variant="contained" className="bg-blue-500 text-white">
              Driver
            </Button>
            <Button onClick={() => filterByRole("Technician")} variant="contained" className="bg-blue-500 text-white">
              Technician
            </Button>

            <Button onClick={() => { setFilteredEmployees(employees); setRoleFilter(""); }} variant="contained" className="bg-gray-400 text-white">
              Clear Filter
            </Button>


            {/* Download Button */}
            <button
              onClick={generatePDF}
              className="ml-auto bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Download
            </button>
          </div>

          {noResults ? (
            <div>
              <p>No Users Found</p>
            </div>
          ) : (
            <div ref={componentsRef} className="overflow-x-auto">
              <div className="overflow-y-auto" style={{ maxHeight: '450px' }}>
                <table className="w-[100%] bg-white border border-gray-200 mx-auto">
                  <thead>
                    <tr style={{ backgroundColor: '#1AACAC' }} className="text-white uppercase text-sm leading-normal">
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
                            style={{ backgroundColor: '#fa7070' }}
                            className="text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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
