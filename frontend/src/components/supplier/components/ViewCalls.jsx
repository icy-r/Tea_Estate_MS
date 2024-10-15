import React, { useState, useEffect } from 'react';
import axios from '../../../services/axios.js';
import { Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CallingSupplyList = ({ supplierid }) => {
    const [supplierDetails, setSupplierDetails] = useState(null);
    const [callingSupplies, setCallingSupplies] = useState([]);
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const [openQuoteDialog, setOpenQuoteDialog] = useState(false); // State for opening send quote dialog
    const [openViewQuoteDialog, setOpenViewQuoteDialog] = useState(false); // State for viewing/editing a quote

    const [selectedSupply, setSelectedSupply] = useState(null); // State to track the supply selected for quote
    const [quoteDetails, setQuoteDetails] = useState({ quantity: '', price: '', status: '' }); // State for the quote form

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    // Fetch supplier details
    const fetchSupplierDetails = async () => {
        try {
            const response = await axios.get(`/supplier/${supplierid}`);
            setSupplierDetails(response.data[0]);
        } catch (error) {
            setAlert({ open: true, message: 'Error fetching supplier details', severity: 'error' });
        }
    };

    // Fetch calling supplies
    const fetchCallingSupplies = async () => {
        try {
            const response = await axios.get(`/callingSupply?supplierId=${supplierid}`);
            setCallingSupplies(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({ open: true, message: 'Error fetching calling supplies', severity: 'error' });
        }
    };

    // Filter requests based on status
    useEffect(() => {
        if (supplierDetails && callingSupplies.length > 0) {
            const filtered = callingSupplies.filter(
                (supply) => supplierDetails.supplyType !== "completed"
            );
            setFilteredSupplies(filtered);
        }
    }, [supplierDetails, callingSupplies]);

    useEffect(() => {
        if (supplierid) {
            fetchSupplierDetails();
            fetchCallingSupplies();
        }
    }, [supplierid]);

    // Handle dialog open for sending a quote
    const handleOpenQuoteDialog = (supply) => {
        setSelectedSupply(supply);
        setOpenQuoteDialog(true);
    };

    // Handle dialog open for viewing/editing a quote
    const handleOpenViewQuoteDialog = (supply) => {
        setSelectedSupply(supply);
        setOpenViewQuoteDialog(true);
        // Fetch the existing quote details (optional)
        fetchQuoteDetails(supply.callingSupplyId);
    };

    // Handle closing dialogs
    const handleCloseDialogs = () => {
        setOpenQuoteDialog(false);
        setOpenViewQuoteDialog(false);
        setQuoteDetails({ quantity: '', price: '', status: '' });
    };

    // Handle sending quote submission
    const handleSendQuote = async () => {
        try {
            const response = await axios.post('/quotation/', {
                callingSupplyId: selectedSupply.callingSupplyId,
                supplierID: supplierid,
                supplyType: selectedSupply.supplyType,
                quantity: quoteDetails.quantity,
                price: quoteDetails.price,
                status: quoteDetails.status,
            });
            setAlert({ open: true, message: 'Quote sent successfully', severity: 'success' });
            handleCloseDialogs();
        } catch (error) {
            setAlert({ open: true, message: 'Error sending quote', severity: 'error' });
        }
    };

    // Handle updating quote submission
    const handleUpdateQuote = async () => {
        try {
            const response = await axios.put(`/quotation/${selectedSupply.callingSupplyId}`, {
                quantity: quoteDetails.quantity,
                price: quoteDetails.price,
                status: quoteDetails.status,
            });

            const selectedSupplydata=selectedSupply.qnumber;
            console.log(selectedSupplydata);
            const response2 = await axios.put(`/callingSupply/${selectedSupply.callingSupplyId}`, selectedSupplydata);
            console.log(response2.data);
            setAlert({ open: true, message: 'Quote updated successfully', severity: 'success' });
            handleCloseDialogs();
        } catch (error) {
            setAlert({ open: true, message: 'Error updating quote', severity: 'error' });
        }
    };

    // Fetch quote details (for view/edit quote functionality)
    const fetchQuoteDetails = async (callingSupplyId) => {
        try {
            const response = await axios.get(`/quotation/${callingSupplyId}`);
            setQuoteDetails({
                quantity: response.data.quantity,
                price: response.data.price,
                status: response.data.status,
            });
        } catch (error) {
            setAlert({ open: true, message: 'Error fetching quote details', severity: 'error' });
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold ml-5 mb-6">Supplier Details</h1>

            {supplierDetails ? (
                <div className="ml-5 mb-9 ">
                    <Typography variant="h6">Supplier Name: {supplierDetails.companyName}</Typography>
                    <Typography variant="body1">Contact: {supplierDetails.contactNum}</Typography>
                    <Typography variant="body1">Email: {supplierDetails.email}</Typography>
                    <Typography variant="body1">Address: {supplierDetails.companyAddress}</Typography>
                    <Typography variant="body1">Supply Type: {supplierDetails.supplyType}</Typography>
                </div>
            ) : (
                <Typography variant="body1" className="mb-4">Loading supplier details...</Typography>
            )}

            <h1 className="text-2xl font-bold mb-6">View Calling Supplies</h1>

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} className="shadow-lg rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#14b8a6", color: "black", marginRight: "5px"}}>
                                <TableCell><b><center>Supply Type</center></b></TableCell>
                                <TableCell><b><center>Quantity</center></b></TableCell>
                                <TableCell><b><center>Status</center></b></TableCell>
                                <TableCell><b><center>Actions</center></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSupplies.length > 0 ? (
                                filteredSupplies.map((supply) => (
                                    <TableRow key={supply.callingSupplyId} className="hover:bg-gray-100">
                                        <TableCell><center>{supply.supplyType}</center></TableCell>
                                        <TableCell><center>{supply.quantity}</center></TableCell>
                                        <TableCell><center>{supply.status}</center></TableCell>
                                        <TableCell>
                                            <center>
                                                <Button onClick={() => handleOpenQuoteDialog(supply)} variant="outlined" color="primary">Send Quote</Button>
                                                <Button onClick={() => handleOpenViewQuoteDialog(supply)} variant="contained" color="secondary" className="ml-2">View Quote</Button>
                                            </center>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center py-4">No matching calling supplies available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for Sending Quote */}
            <Dialog open={openQuoteDialog} onClose={handleCloseDialogs}>
                <DialogTitle>Send Quote</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quoteDetails.quantity}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, quantity: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={quoteDetails.price}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        fullWidth
                        value={quoteDetails.status}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleSendQuote} variant="contained" color="primary">Send</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Viewing/Editing Quote */}
            <Dialog open={openViewQuoteDialog} onClose={handleCloseDialogs}>
                <DialogTitle>View/Edit Quote</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quoteDetails.quantity}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, quantity: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={quoteDetails.price}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        fullWidth
                        value={quoteDetails.status}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleUpdateQuote} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for alerts */}
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CallingSupplyList;
