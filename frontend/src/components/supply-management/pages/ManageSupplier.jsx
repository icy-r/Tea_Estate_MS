import React, { useEffect, useState } from 'react'; 
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
      await axios.delete(`/supplier/${id}`);
      setFilteredSuppliers(filteredSuppliers.filter((supplier) => supplier._id !== id));
      setAlert({ open: true, message: 'Supplier deleted successfully', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: 'Error deleting supplier', severity: 'error' });
    }
  };

  const handleUpdateSupplier = async () => {
    try {
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
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" color="primary" size="small" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#15F5BA' }}>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">NIC</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Contact Number</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Supply Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell align="left">{supplier.fname}</TableCell>
                  <TableCell align="left">{supplier.lname}</TableCell>
                  <TableCell align="left">{supplier.nic}</TableCell>
                  <TableCell align="left">{supplier.companyName}</TableCell>
                  <TableCell align="left">{supplier.contactNum}</TableCell>
                  <TableCell align="left">{supplier.email}</TableCell>
                  <TableCell align="left">{supplier.supplyType}</TableCell>
                  <TableCell align="left">
                    <Button variant="contained" sx={{ bgcolor: '#15F5BA', color: 'black' }} onClick={() => handleUpdateOpen(supplier)}>
                      Update
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: '#FA7070', color: 'black', ml: 2 }} onClick={() => handleDelete(supplier._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No suppliers available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <center>
          <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={generatePDF} className="mt-4">
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
          <Button onClick={handleDialogClose} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleUpdateSupplier} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSupplier;
