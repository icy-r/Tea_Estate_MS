import React, { useEffect, useState } from "react";
import axios from '../../../services/axios.js';
import { Table, TableBody, TableCell,Button, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Typography, Modal, Stepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const OrderTracking = ({ buyerId }) => {
    const [buyerData, setBuyerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderSales, setOrderSales] = useState([]);
    const [selectedTransportLog, setSelectedTransportLog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchBuyerData = async () => {
            try {
                const buyerResponse = await axios.get(`/buyers/${buyerId}`);
                if (buyerResponse.data) {
                    setBuyerData(buyerResponse.data);
                } else {
                    setError("No buyer data found");
                }

                const ordersResponse = await axios.get('/ordersSales');
                setOrderSales(ordersResponse.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchBuyerData();
    }, [buyerId]);

    const fetchTransportLog = async (transportationId) => {
        try {
            const response = await axios.get(`/transportLog/${transportationId}`);
            setSelectedTransportLog(response.data);
            setModalOpen(true); 
        } catch (error) {
            console.error("Failed to fetch transport log", error);
        }
    };

    const getStepIndex = (status) => {
        switch (status) {
            case "Upcoming":
                return 0;
            case "Trip Started":
                return 1;
            case "Completed":
                return 2;
            default:
                return 0;
        }
    };

    const steps = ["Upcoming", "Trip Started", "Completed"];

    // Custom step icon styles
    const CustomStepIcon = styled('div')(({ theme, active, completed }) => ({
        color: completed ? theme.palette.success.main : active ? theme.palette.primary.main : theme.palette.grey[500],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: completed ? '#15F5BA' : active ?'#15F5BA' : theme.palette.grey[500],
        color: 'white',
    }));

    const StepIconComponent = (props) => {
        const { active, completed } = props;
        return (
            <CustomStepIcon active={active} completed={completed}>
                {completed ? '✔' : active ? '➤' : '•'}
            </CustomStepIcon>
        );
    };

    if (loading) return <CircularProgress />;
    if (error) return <p>{error}</p>;

    const filteredOrders = orderSales.filter(order => order.buyer_id === buyerId);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>

            {buyerData ? (
                <div>

                    {/* Orders Table */}
                    <h2 className="text-xl font-bold mt-4">Orders for Buyer</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="order table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>Transportation ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order.orderID}</TableCell>
                                        <TableCell>{order.productID}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {/* Clickable Transportation ID */}
                                            <span
                                                style={{ color: 'blue', cursor: 'pointer' }}
                                                onClick={() => fetchTransportLog(order.transportation_id)}
                                            >
                                               <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ bgcolor: '#15F5BA', '&:hover': { bgcolor: '#1AACAC', boxShadow: 'none' }, boxShadow: 'none', mr: 2, color: 'black', border: 'none' }}
                                               >View Status</Button>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <p>No buyer data found</p>
            )}

            {/* Modal to display transport log data */}
            <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="transport-log-modal"
            aria-describedby="transport-log-details"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500, // Increased width for more space
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2, // Rounded corners for better aesthetics
                }}
            >
                {selectedTransportLog ? (
                    <div>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Transportation Details
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Transport ID:</strong> {selectedTransportLog._id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Vehicle ID:</strong> {selectedTransportLog.vehicle_id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Route ID:</strong> {selectedTransportLog.route_id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Scheduled Date:</strong> {new Date(selectedTransportLog.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Status:</strong> {selectedTransportLog.status}
                        </Typography>

                        {/* Stepper to show the status with custom colors */}
                        <Stepper activeStep={getStepIndex(selectedTransportLog.status)} alternativeLabel sx={{ mt: 4 }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={StepIconComponent}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {/* Button to close the modal */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setModalOpen(false)}
                            sx={{mt:4, bgcolor: '#FA7070', border: 'none', '&:hover': { bgcolor: '#BF4010', boxShadow: 'none', border: 'none' }, boxShadow: 'none', color: 'black' }}
                        >
                            Close
                        </Button>
                    </div>
                ) : (
                    <Typography variant="body1">No transport log data found</Typography>
                )}
            </Box>
        </Modal>
        </div>
    );
};

export default OrderTracking;
