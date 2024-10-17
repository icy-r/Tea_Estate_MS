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
    Stepper,
    Step,
    StepLabel,
    DialogContent,
    DialogActions,
    Box,
    Button,
    Snackbar,
    Alert,
    TextField,
    TablePagination,
    styled
} from '@mui/material';

// Define the steps
const steps = ['Upcoming', 'Trip Started', 'Completed'];

// Function to map status to step index
function getStep(status) {
    switch (status) {
        case 'upcoming':
            return 0;
        case 'Trip Started':
            return 1;
        case 'Completed':
            return 2;
        default:
            return 0;
    }
}

// Custom Step Icon
const CustomStepIcon = (props) => {
    const { active, completed, className } = props;

    return (
        <Box
            className={className}
            sx={{
                backgroundColor: completed ? '#15F5BA' : active ? '#15F5BA' : 'gray',
                zIndex: 1,
                color: '#fff',
                width: 30,
                height: 30,
                display: 'flex',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {completed ? '✓' : active ? '●' : '○'}
        </Box>
    );
};

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

    const [showUnassigned, setShowUnassigned] = useState(false);
    const [filterDate, setFilterDate] = useState('');

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
        axios.get('/orders')
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
                const todayDate = getTodayDate(); // Assuming it's in 'YYYY-MM-DD' format
                console.log(response.data);
        
                const filteredTransportOptions = response.data.filter(option => {
                    // Format createdAtDate to 'YYYY-MM-DD' using toLocaleDateString
                    const createdAtDate = new Date(option.date).toLocaleDateString('en-CA'); // 'en-CA' ensures 'YYYY-MM-DD'
                    console.log("Today Date:", todayDate);
                    console.log("Created At Date:", createdAtDate);
        
                    return createdAtDate === todayDate && option.type === 'Delivery transportation';
                });
        
                setTransportOptions(filteredTransportOptions);
                console.log("Transport Options:", filteredTransportOptions);
            })
            .catch(error => {
                setError(error);
            });
        };

    const handleTransportChange = (orderId, transportId, buyer_id) => {
        setAssignedTransport(prevState => ({
            ...prevState,
            [orderId]: transportId
        }));

        axios.put(`/orders/${orderId}`, { transportation_id: transportId })
            .then(response => {
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

    const filteredOrders = orderSales.filter(order => {
        const isUnassigned = showUnassigned ? order.transportation_id === null : true;
        const matchesDate = filterDate ? new Date(order.orderDate).toISOString().split('T')[0] === filterDate : true;
        return isUnassigned && matchesDate;
    });

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
                        <TableRow sx={{ bgcolor: '#15F5BA' }}>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Buyer ID</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Quantity</TableCell>
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
                                <TableCell>
                                    <Button onClick={() => fetchTransportDetails(order.transportation_id)} sx={{ color: '#1AACAC' }}>
                                        {order.transportation_id || 'No Transportation Assigned'}
                                    </Button>
                                </TableCell>
                                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <Select
                                            value={assignedTransport[order._id] || ''}
                                            onChange={(e) => handleTransportChange(order._id, e.target.value, order.buyer_id)}
                                            displayEmpty
                                            variant="outlined"
                                        >
                                            <MenuItem value="" disabled>Select Transport</MenuItem>
                                            {transportOptions.map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                    rout:{option.route_id}  on:{option.time} vehicle:{option.vehicle_id}
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

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Transport Details</DialogTitle>
                <DialogContent>
                    {selectedTransportDetails ? (
                      
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <Typography><strong>ID:</strong> {selectedTransportDetails._id}</Typography>
                            <Typography><strong>Route:</strong> {selectedTransportDetails.route_id}</Typography>
                            <Typography><strong>Type:</strong> {selectedTransportDetails.type}</Typography>
                            <Typography><strong>Started Time:</strong> {selectedTransportDetails.time}</Typography>
                            <Typography><strong>Date:</strong> {new Date(selectedTransportDetails.createdAt).toLocaleDateString()}</Typography>
                           
                            <Typography><strong>Status:</strong> {selectedTransportDetails.status}</Typography>
                            {/* Stepper with custom icons */}
                            <Box sx={{ mt: 3}}>
                                <Stepper activeStep={getStep(selectedTransportDetails.status)} alternativeLabel>
                                    {steps.map((label, index) => (
                                        <Step key={index}>
                                            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="primary" style={{ backgroundColor: '#FA7070', color: 'black', boxShadow: 'none' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DistributeManagement;
