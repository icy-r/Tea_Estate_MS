import React, { useState, useEffect } from 'react';
import axios from '../../../services/axios.js';
import { Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';

const CallingSupplyList = ({ supplierid }) => {
    const [supplierDetails, setSupplierDetails] = useState(null);
    const [callingSupplies, setCallingSupplies] = useState([]);
    const [filteredSupplies, setFilteredSupplies] = useState([]); // For filtered supplies
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    // Fetch supplier details
    const fetchSupplierDetails = async () => {
        try {
            const response = await axios.get(`/supplier/${supplierid}`); // Replace with the correct API endpoint
            setSupplierDetails(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            setAlert({ open: true, message: 'Error fetching supplier details', severity: 'error' });
            console.error("Error fetching supplier details:", error);
        }
    };

    // Fetch calling supplies
    const fetchCallingSupplies = async () => {
        try {
            const response = await axios.get(`/callingSupply?supplierId=${supplierid}`); // Assuming the API filters by supplierId
            setCallingSupplies(response.data);
            console.log(response.data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({ open: true, message: 'Error fetching calling supplies', severity: 'error' });
            console.error("Error fetching calling supplies:", error);
        }
    };

    // Filter supplies based on supplier's supply type
    useEffect(() => {
        if (supplierDetails && callingSupplies.length > 0) {
            const filtered = callingSupplies.filter(
                (supply) => supply.supplyType === supplierDetails.supplyType
            );
            setFilteredSupplies(filtered);
        }
    }, [supplierDetails, callingSupplies]);

    // Fetch the supplier details and calling supplies when the component mounts
    useEffect(() => {
        if (supplierid) {
            fetchSupplierDetails();
            fetchCallingSupplies();
        }
    }, [supplierid]);

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSupplies.length > 0 ? (
                                filteredSupplies.map((supply) => (
                                    <TableRow key={supply.callingSupplyId} className="hover:bg-gray-100">
                                        <TableCell className="py-2 px-4 border"><center>{supply.supplyType}</center></TableCell>
                                        <TableCell className="py-2 px-4 border"><center>{supply.quantity}</center></TableCell>
                                        <TableCell className="py-2 px-4 border"><center>{supply.status}</center></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="3" className="text-center py-4">No matching calling supplies available</TableCell>
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
        </div>
    );
};

export default CallingSupplyList;
