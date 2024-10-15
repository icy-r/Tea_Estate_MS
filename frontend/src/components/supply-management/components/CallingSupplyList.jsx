import React, { useState } from 'react';
import axios from '../../../services/axios.js';
import ViewQuotes from './ViewQoutes.jsx';
import { Select, MenuItem, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const CallingSupplyList = ({ callingSupplies, loading, onUpdateSupply, onDeleteSupply }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [quoteDialogOpen, setQuoteDialogOpen] = useState(false); // State to handle "View Quotes" dialog

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

    const handleOpenQuoteDialog = (supply) => {
        setSelectedSupply(supply);
        setQuoteDialogOpen(true); // Open the "View Quotes" dialog
    };

    const handleCloseQuoteDialog = () => {
        setQuoteDialogOpen(false); // Close the "View Quotes" dialog
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/callingSupply/${id}`);
            onDeleteSupply(id); // Call the delete handler in the parent component
            setAlert({ open: true, message: 'Calling supply deleted successfully', severity: 'success' });
        } catch (error) {
            setAlert({ open: true, message: 'Error deleting calling supply', severity: 'error' });
        }
    };
    
    const handleUpdateSupply = async () => {
        try {
            const response = await axios.put(`/callingSupply/${selectedSupply.callingSupplyId}`, selectedSupply);
            onUpdateSupply(response.data); // Call the update handler in the parent component
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
            <h1 className="text-2xl font-bold mb-6">Supply Quote Requests</h1>

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} className="shadow-lg rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow  sx={{backgroundColor:"#15F5BA",color:"black",marginRight:"5px"}}>
                                <TableCell><b><center>Supply Type</center></b></TableCell>
                                <TableCell ><b><center>Quantity</center></b></TableCell>
                                <TableCell><b><center>Status</center></b></TableCell>
                                <TableCell><b><center>Actions</center></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {callingSupplies.length > 0 ? (
                                callingSupplies.map((supply) => (
                                    <TableRow key={supply.callingSupplyId} className="hover:bg-gray-100">
                                        <TableCell className="py-2 px-4 border">{supply.supplyType}</TableCell>
                                        <TableCell className="py-2 px-4 border">{supply.quantity}</TableCell>
                                        <TableCell className="py-2 px-4 border">{supply.status}</TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button className='bg-teal-500'  sx={{backgroundColor:"#15F5BA",color:"black",marginRight:"5px"}}onClick={() => handleOpenUpdateDialog(supply)}>
                                                Update
                                            </Button>
                                            <Button variant="contained" sx={{backgroundColor:"#FA7070",color:"black",marginRight:"5px"}} onClick={() => handleDelete(supply.callingSupplyId)}>
                                                Delete
                                            </Button>
                                            <Button variant="contained" sx={{backgroundColor:"#1AACAC",color:"black"}} onClick={() => handleOpenQuoteDialog(supply)}>
                                                View Quotes
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
                                disabled
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
                            <Select
                                margin="dense"
                                name="status"
                                fullWidth
                                value={selectedSupply.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleUpdateSupply} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* View Quotes Dialog */}
            <Dialog open={quoteDialogOpen} onClose={handleCloseQuoteDialog} 
                fullWidth
                maxWidth={false}  // Allows us to set custom width
                PaperProps={{
                    style: {
                        width: '65%',  // Sets width to 65% of the window
                    },}}
            
            >
                <DialogTitle>View Quotes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you will see the quotes submitted for the selected calling supply.
                        {/* Add the quotes display component here later */}
                    </DialogContentText>
                    <ViewQuotes data={selectedSupply}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQuoteDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CallingSupplyList;
