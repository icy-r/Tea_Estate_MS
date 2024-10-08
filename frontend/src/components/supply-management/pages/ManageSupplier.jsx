import React, { useEffect, useState } from 'react'; 
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigateTo = useNavigate();

  // Fetch all suppliers from the backend
  const fetchDetails = async () => {
    try {
      const response = await axios.get("/supplier/");
      setSuppliers(response.data);
      setFilteredSuppliers(response.data); // Initialize filtered suppliers
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching supplier data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // Function to filter suppliers based on search input
  const handleSearch = () => {
    const filtered = suppliers.filter(supplier => 
      supplier.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
      supplier.lname.toLowerCase().includes(searchInput.toLowerCase()) ||
      supplier.nic.toLowerCase().includes(searchInput.toLowerCase()) ||
      supplier.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
      supplier.contactNum.toLowerCase().includes(searchInput.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleUpdateOpen = (supplier) => {
    setSelectedSupplier(supplier);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSupplier(null);
  };

  const handleDelete = async (id) => {
    try {
        // Use backticks instead of slashes for template literals
        await axios.delete(`/supplier/${id}`);
        setFilteredSuppliers(filteredSuppliers.filter((supplier) => supplier._id !== id));
        setAlert({ open: true, message: 'Supplier deleted successfully', severity: 'success' });
    } catch (error) {
        setAlert({ open: true, message: 'Error deleting supplier', severity: 'error' });
    }
};

const handleUpdateSupplier = async () => {
    try {
        // Use backticks instead of slashes for template literals
        await axios.put(`/supplier/${selectedSupplier._id}`, selectedSupplier);
        setFilteredSuppliers(filteredSuppliers.map((supplier) => (supplier._id === selectedSupplier._id ? selectedSupplier : supplier)));
        setAlert({ open: true, message: 'Supplier updated successfully', severity: 'success' });
        handleDialogClose();
    } catch (error) {
        setAlert({ open: true, message: 'Error updating supplier', severity: 'error' });
    }
};


  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier({ ...selectedSupplier, [name]: value });
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier List", 14, 16);
    
    const tableData = filteredSuppliers.map(supplier => [
      supplier.fname,
      supplier.lname,
      supplier.nic,
      supplier.companyName,
      supplier.contactNum,
      supplier.email,
      supplier.supplyType,
    ]);
    
    doc.autoTable({
      head: [['First Name', 'Last Name', 'NIC', 'Company Name', 'Contact Number', 'Email', 'Supply Type']],
      body: tableData,
      startY: 20,
    });

    doc.save("supplier_list.pdf");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Supplier Management</h1>

      <div className="mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"  // Set size to small
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" color="primary" size="small" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-black ">
              <th className="py-2 px-4 text-center">First Name</th>
              <th className="py-2 px-4 text-center">Last Name</th>
              <th className="py-2 px-4 text-center">NIC</th>
              <th className="py-2 px-4 text-center">Company Name</th>
              <th className="py-2 px-4 text-center">Contact Number</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Supply Type</th> {/* Added Supply Type column */}
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{supplier.fname}</td>
                  <td className="py-2 px-4 border">{supplier.lname}</td>
                  <td className="py-2 px-4 border">{supplier.nic}</td>
                  <td className="py-2 px-4 border">{supplier.companyName}</td>
                  <td className="py-2 px-4 border">{supplier.contactNum}</td>
                  <td className="py-2 px-4 border">{supplier.email}</td>
                  <td className="py-2 px-4 border">{supplier.supplyType}</td> {/* Displaying Supply Type */}
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-black px-4 py-2 rounded-md"
                      onClick={() => handleUpdateOpen(supplier)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-black px-4 py-2 rounded-md"
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No suppliers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div>
      <center><Button style={{ marginTop: '20px' }}  variant="contained" color="primary" onClick={generatePDF} className="mt-4">
        Generate PDF
      </Button>
      </center>
      </div>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Supplier</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the supplier details below.</DialogContentText>
          {selectedSupplier && (
            <>
              <TextField
                margin="dense"
                name="fname"
                label="First Name"
                type="text"
                fullWidth
                value={selectedSupplier.fname}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="lname"
                label="Last Name"
                type="text"
                fullWidth
                value={selectedSupplier.lname}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="nic"
                label="NIC"
                type="text"
                fullWidth
                value={selectedSupplier.nic}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="companyName"
                label="Company Name"
                type="text"
                fullWidth
                value={selectedSupplier.companyName}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="contactNum"
                label="Contact Number"
                type="text"
                fullWidth
                value={selectedSupplier.contactNum}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={selectedSupplier.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="supplyType"
                label="Supply Type"
                type="text"
                fullWidth
                value={selectedSupplier.supplyType}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSupplier}>Update</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSupplier;