import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';

const ManageSupply = () => {
  const [supplies, setSupplies] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState(null);

  // Fetch all supplies from the backend
  const fetchDetails = async () => {
    try {
      const response = await axios.get("/supplies/");
      setSupplies(response.data);
    } catch (error) {
      setAlert({ open: true, message: 'Error fetching supply data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdateOpen = (supply) => {
    setSelectedSupply(supply);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSupply(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/supplies/${id}`);
      setSupplies(supplies.filter((supply) => supply._id !== id));
      setAlert({ open: true, message: 'Supply deleted successfully', severity: 'success' });
    } catch (error) {
      setAlert({ open: true, message: 'Error deleting supply', severity: 'error' });
    }
  };

  const handleUpdateSupply = async () => {
    try {
      await axios.put(`/supplies/${selectedSupply._id}`, selectedSupply);
      setSupplies(supplies.map((supply) => (supply._id === selectedSupply._id ? selectedSupply : supply)));
      setAlert({ open: true, message: 'Supply updated successfully', severity: 'success' });
      handleDialogClose();
    } catch (error) {
      setAlert({ open: true, message: 'Error updating supply', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupply({ ...selectedSupply, [name]: value });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Supply Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Supply ID</th>
              <th className="py-2 px-4 text-left">Supply Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-center">Supplier Name</th>
              <th className="py-2 px-4 text-center">Purchase Date</th>
              <th className="py-2 px-4 text-center">Expiration Date</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.length > 0 ? (
              supplies.map((supply) => (
                <tr key={supply._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{supply.supplyId}</td>
                  <td className="py-2 px-4 border">{supply.supplyType}</td>
                  <td className="py-2 px-4 border">{supply.quantity}</td>
                  <td className="py-2 px-4 border">{supply.supplierName}</td>
                  <td className="py-2 px-4 border">{new Date(supply.purchaseDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{new Date(supply.expirationDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdateOpen(supply)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(supply._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No supplies available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Supply</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the supply details below.
          </DialogContentText>
          {selectedSupply && (
            <>
              <TextField
                margin="dense"
                name="supplyId"
                label="Supply ID"
                type="text"
                fullWidth
                value={selectedSupply.supplyId}
                onChange={handleChange}
                disabled // Assuming Supply ID is not editable
              />
              <TextField
                margin="dense"
                name="supplyType"
                label="Supply Type"
                type="text"
                fullWidth
                value={selectedSupply.supplyType}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={selectedSupply.quantity}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="supplierName"
                label="Supplier Name"
                type="text"
                fullWidth
                value={selectedSupply.supplierName}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="purchaseDate"
                label="Purchase Date"
                type="date"
                fullWidth
                value={selectedSupply.purchaseDate ? selectedSupply.purchaseDate.split('T')[0] : ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="expirationDate"
                label="Expiration Date"
                type="date"
                fullWidth
                value={selectedSupply.expirationDate ? selectedSupply.expirationDate.split('T')[0] : ''}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSupply} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSupply;
