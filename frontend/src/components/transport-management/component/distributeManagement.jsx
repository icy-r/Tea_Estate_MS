import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    CircularProgress, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    Snackbar,
    Alert,
    TextField,
    TablePagination 
} from '@mui/material';

const DistributeManagement = () => {
    const [orderSales, setOrderSales] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [transportOptions, setTransportOptions] = useState([]); 
    const [assignedTransport, setAssignedTransport] = useState({}); 
    const [selectedTransportDetails, setSelectedTransportDetails] = useState(null); 
    const [openDialog, setOpenDialog] = useState(false); 
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 

    // Pagination states
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(5); 

    // Filter states
    const [showUnassigned, setShowUnassigned] = useState(false); // Filter for unassigned orders
    const [filterDate, setFilterDate] = useState(''); // Date filter

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const fetchData = () => {
        axios.get('/ordersSales')
            .then(response => {
                setOrderSales(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        axios.get('/transportLog')
            .then(response => {
                const todayDate = getTodayDate();
                const filteredTransportOptions = response.data.filter(option => {
                    const createdAtDate = option.createdAt.split('T')[0]; 
                    return createdAtDate === todayDate && option.type === 'Delivery transportation';
                });
                setTransportOptions(filteredTransportOptions);
            })
            .catch(error => {
                setError(error);
            });
    };

    const handleTransportChange = (orderId, transportId,buyer_id) => {
        setAssignedTransport(prevState => ({
            ...prevState,
            [orderId]: transportId
        }));

        axios.put(`/ordersSales/${orderId}`, { transportation_id: transportId })
            .then(response => {
                console.log(`Order ${orderId} updated successfully with transport ${transportId}`);
                setSnackbarMessage(`Order ${orderId} updated successfully!`);
                setSnackbarOpen(true); 
                fetchData(); 
            })
            .catch(error => {
                console.error(`Error updating order ${orderId}:`, error);
            });
    };

    const fetchTransportDetails = (transportId) => {
        axios.get(`/transportLog/${transportId}`)
            .then(response => {
                setSelectedTransportDetails(response.data);
                console.log(`Fetched transport details for ID ${transportId}:`, response.data);
                setOpenDialog(true);
            })
            .catch(error => {
                console.error(`Error fetching transport details for ID ${transportId}:`, error);
            });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTransportDetails(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Filter orders based on unassigned status and date
    const filteredOrders = orderSales.filter(order => {
        const isUnassigned = showUnassigned ? order.transportation_id === null : true;
        const matchesDate = filterDate ? new Date(order.orderDate).toISOString().split('T')[0] === filterDate : true;

        return isUnassigned && matchesDate;
    });

    // Pagination functionality
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching data: {error.message}</Typography>;
    }

    return (
        <div className='px-10'>
            <Typography variant="h4" gutterBottom>Distribute Management</Typography>
            <div className='grid grid-cols-2 gap-6'>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                        value={showUnassigned}
                        onChange={(e) => setShowUnassigned(e.target.value)}
                        displayEmpty
                        variant="outlined"
                    >
                        <MenuItem value={false}>Show All Orders</MenuItem>
                        <MenuItem value={true}>Show Unassigned Orders</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="date"
                    label="Filter by Date"
                    variant="outlined"
                    fullWidth
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#15F5BA'}}>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Buyer ID</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Transportation</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Assign Transportation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.orderID}</TableCell>
                                <TableCell>{order.buyer_id}</TableCell>
                                <TableCell>{order.productID}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <Button onClick={() => fetchTransportDetails(order.transportation_id)} sx={{ color: '#1AACAC'}}>
                                        {order.transportation_id || 'No Transportation Assigned'} 
                                    </Button>
                                </TableCell>
                                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <Select
                                            value={assignedTransport[order._id] || ''}
                                            onChange={(e) => handleTransportChange(order._id, e.target.value,order.buyer_id)}
                                            displayEmpty
                                            variant="outlined"
                                        >
                                            <MenuItem value="" disabled>
                                                Select Transport
                                            </MenuItem>
                                            {transportOptions.map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                    {option.route_id} route on {option.time}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Transport Log Details</DialogTitle>
                <DialogContent>
                    {selectedTransportDetails ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="body1">
                                <strong>Route ID:</strong> {selectedTransportDetails.route_id}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Time:</strong> {selectedTransportDetails.time}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Date:</strong> {new Date(selectedTransportDetails.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Vehicle:</strong> {selectedTransportDetails.vehicle_id}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedTransportDetails.status}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DistributeManagement;
