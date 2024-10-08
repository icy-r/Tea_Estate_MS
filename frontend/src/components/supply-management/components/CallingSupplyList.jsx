import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const CallingSupplyList = () => {
    const [callingSupplies, setCallingSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState(null);

    // Fetch all calling supplies from the backend
    const fetchCallingSupplies = async () => {
        try {
            const response = await axios.get('/callingSupply/');
            setCallingSupplies(response.data);
        } catch (error) {
            setAlert({ open: true, message: 'Error fetching calling supply data', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCallingSupplies();
    }, []);

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedSupply(null);
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleOpenUpdateDialog = (supply) => {
        setSelectedSupply(supply);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/callingSupply/${id}`);
            setCallingSupplies(callingSupplies.filter((supply) => supply.callingSupplyId !== id));
            setAlert({ open: true, message: 'Calling supply deleted successfully', severity: 'success' });
        } catch (error) {
            setAlert({ open: true, message: 'Error deleting calling supply', severity: 'error' });
        }
    };

    const handleUpdateSupply = async () => {
        try {
            await axios.put(`/callingSupply/${selectedSupply.callingSupplyId}`, selectedSupply);
            setCallingSupplies(callingSupplies.map((supply) => (supply.callingSupplyId === selectedSupply.callingSupplyId ? selectedSupply : supply)));
            setAlert({ open: true, message: 'Calling supply updated successfully', severity: 'success' });
            handleDialogClose();
        } catch (error) {
            setAlert({ open: true, message: 'Error updating calling supply', severity: 'error' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedSupply({ ...selectedSupply, [name]: value });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">View Calling Supplies</h1>

            {/* Show loader while loading data */}
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} className="shadow-lg rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-teal-500 text-black">
                                <TableCell><b><center>Supply Type</center></b></TableCell>
                                <TableCell ><b><center>Quantity</center></b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {callingSupplies.length > 0 ? (
                                callingSupplies.map((supply) => (
                                    <TableRow key={supply.callingSupplyId} className="hover:bg-gray-100 ">
                                        <TableCell className="py-2 px-4 border">{supply.supplyType}</TableCell>
                                        <TableCell className="py-2 px-4 border">{supply.quantity}</TableCell>
                                        <TableCell className="py-2 px-4 border">{supply.status}</TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button className='bg-teal-500 ' sx={{backgroundColor:"#1AACAC",color:"black",marginRight:"5px"}} variant="contained"  onClick={() => handleOpenUpdateDialog(supply)}>
                                                Update
                                            </Button>
                                            <Button variant="contained" sx={{backgroundColor:"#FA7070",color:"black"}}  onClick={() => handleDelete(supply.callingSupplyId)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center py-4">No calling supplies available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Update Calling Supply</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the calling supply details below.</DialogContentText>
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
                    <Button onClick={handleUpdateSupply} color="primary">Update</Button>
                    <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CallingSupplyList;
