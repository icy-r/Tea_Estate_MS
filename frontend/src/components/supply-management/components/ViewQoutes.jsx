import React, { useState, useEffect } from 'react';
import axios from '../../../services/axios.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';

const ViewQuotes = ({ data }) => {
    const [callingSupplies, setCallingSupplies] = useState([]);
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [supplierDetails, setSupplierDetails] = useState(null);

    const fetchCallingSupplies = async () => {
        try {
            const response = await axios.get(`/quotation`);
            setCallingSupplies(response.data);
            console.log("Calling supplies:", response.data);
        } catch (error) {
            console.error("Error fetching calling supplies:", error);
        } finally {
            setLoading(false);
        }
    };

    const acceptQuote = async (acceptedQuoteId) => {
        try {
            // Find the accepted quote
            const acceptedQuote = filteredSupplies.find(supply => supply._id === acceptedQuoteId);
            
            // Check if the accepted quote exists
            if (!acceptedQuote) {
                console.error("Accepted quote not found");
                return;
            }

            // Create a new order supply based on the accepted quote
            const newOrder = {
                supplierId: acceptedQuote.supplierID,
                supplyType: acceptedQuote.supplyType,
                quantity: acceptedQuote.quantity,
                additionalConditions: ' ',
            };

            // Send a request to create a new order supply
            const response = await axios.post('/orders', newOrder);
            console.log("New order supply:", response.data);
            console.log("orderID:", response.data._id);
            
            const response3= await axios.get(`/supplier/${acceptedQuote.supplierID}`);
            setSupplierDetails(response3.data[0]);
            console.log("Supplier details:", response3.data[0]);

            const response2= await axios.put(`/supplier/${supplierDetails._id}`,{activeOrder:response.data._id});
            console.log("updated Supplier details:", response2.data);

            // Update all quotes related to the same callingSupplyId
            const updatedSupplies = filteredSupplies.map(supply => ({
                ...supply,
                status: supply._id === acceptedQuoteId ? 'accepted' : 'rejected'
            }));

            // Update in the backend
            await Promise.all(updatedSupplies.map(supply => {
                return axios.put(`/quotation/${supply._id}/status`, { status: supply.status });
            }));

            // Update local state
            setFilteredSupplies(updatedSupplies);
        } catch (error) {
            console.error("Error accepting quote:", error);
        }
    };

    useEffect(() => {
        fetchCallingSupplies();
    }, []);

    useEffect(() => {
        // Filter supplies based on the callingSupplyId from data prop
        if (data && data.callingSupplyId) {
            const filtered = callingSupplies.filter(
                (supply) => supply.callingSupplyId === data.callingSupplyId
            );
            setFilteredSupplies(filtered);
        }
    }, [callingSupplies, data]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">View Quotes</h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <CircularProgress />
                </div>
            ) : filteredSupplies.length > 0 ? (
                <TableContainer component={Paper} className="shadow-lg rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#15F5BA" }}>
                                <TableCell className="font-bold text-center">Supplier</TableCell>
                                <TableCell className="font-bold text-center">Supply Type</TableCell>
                                <TableCell className="font-bold text-center">Quantity</TableCell>
                                <TableCell className="font-bold text-center">Status</TableCell>
                                <TableCell className="font-bold text-center">Created At</TableCell>
                                <TableCell className="font-bold text-center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSupplies.map((supply) => (
                                <TableRow key={supply._id} className="hover:bg-gray-100">
                                    <TableCell className="text-center">{supply.supplierID}</TableCell>
                                    <TableCell className="text-center">{supply.supplyType}</TableCell>
                                    <TableCell className="text-center">{supply.quantity}</TableCell>
                                    <TableCell className="text-center">{supply.status}</TableCell>
                                    <TableCell className="text-center">{new Date(supply.createdAt).toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => acceptQuote(supply._id)}
                                            disabled={supply.status === 'accepted'} // Disable if already accepted
                                        >
                                            Accept
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p className="text-center py-4">No quotes found for this calling supply.</p>
            )}
        </div>
    );
};

export default ViewQuotes;
