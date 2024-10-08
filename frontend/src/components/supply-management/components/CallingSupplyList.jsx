import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from '../../../services/axios.js'; // Adjust the path as necessary

const CallingSupplyList = ({ callingSupplies, loading }) => {
    const [filteredSupplies, setFilteredSupplies] = useState(callingSupplies);
    const [searchInput, setSearchInput] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState(null);

    useEffect(() => {
        setFilteredSupplies(callingSupplies);
    }, [callingSupplies]);

    const handleSearch = () => {
        const filtered = callingSupplies.filter(supply =>
            supply.callingSupplyId.toLowerCase().includes(searchInput.toLowerCase()) ||
            supply.supplyType.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredSupplies(filtered);
    };

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
            await axios.delete(`/supply/${id}`); // Adjust the API endpoint as necessary
            setFilteredSupplies(filteredSupplies.filter((supply) => supply.callingSupplyId !== id));
            setAlert({ open: true, message: 'Supply deleted successfully', severity: 'success' });
        } catch (error) {
            setAlert({ open: true, message: 'Error deleting supply', severity: 'error' });
        }
    };

    const handleUpdateSupply = async () => {
        try {
            await axios.put(`/supply/${selectedSupply.callingSupplyId}`, selectedSupply); // Adjust the API endpoint as necessary
            setFilteredSupplies(filteredSupplies.map((supply) => (supply.callingSupplyId === selectedSupply.callingSupplyId ? selectedSupply : supply)));
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
            <h1 className="text-2xl font-semibold mb-4">View Calling Supplies</h1>

            {/* Search Input */}
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

            {/* Show loader while loading data */}
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} className="shadow-lg rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Supply ID</b></TableCell>
                                <TableCell><b>Supply Type</b></TableCell>
                                <TableCell><b>Quantity</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSupplies.length > 0 ? (
                                filteredSupplies.map((supply) => (
                                    <TableRow key={supply.callingSupplyId} className="hover:bg-gray-100">
                                        <TableCell>{supply.callingSupplyId}</TableCell>
                                        <TableCell>{supply.supplyType}</TableCell>
                                        <TableCell>{supply.quantity}</TableCell>
                                        <TableCell>{supply.status}</TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button
                                                className="bg-teal-500 text-white"
                                                onClick={() => handleUpdateOpen(supply)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                className="bg-red-500 text-white"
                                                onClick={() => handleDelete(supply.callingSupplyId)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No calling supplies available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Alert for success/error messages */}
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            {/* Dialog for updating supply */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Update Supply</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the supply details below.</DialogContentText>
                    {selectedSupply && (
                        <>
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
                                name="status"
                                label="Status"
                                type="text"
                                fullWidth
                                value={selectedSupply.status}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateSupply}>Update</Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CallingSupplyList;
