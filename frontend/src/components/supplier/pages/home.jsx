import React, { useState, useEffect } from 'react';
import axios from '../../../services/axios.js';
import OrderTracker from '../components/orderTracker.jsx';
import StatusMain from '../components/StatusMain.jsx';
import { Grid, Container, Card, CardContent, Typography, CardActions, Button } from '@mui/material'; // Import MUI components

const Supplierhome = ({ supplierid }) => {
    const [supplierDetails, setSupplierDetails] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [myOrder, setMyOrders] = useState([]);

    const fetchSupplierDetails = async () => {
        try {
            const response = await axios.get(`/supplier/${supplierid}`);
            setSupplierDetails(response.data[0]);
            console.log("Supplier details:", response.data[0]);
            if (response.data[0].activeOrder !== 'none') {
                const orderResponse = await axios.get(`/orders`);
                setOrderDetails(orderResponse.data[0]);
                console.log("Order details:", orderResponse.data);

                const orders = orderResponse.data;
        
                const filteredOrder = orders.find(order => order._id === response.data[0].activeOrder);
                setMyOrders(filteredOrder);
                console.log("My Orders:", filteredOrder);
            }
        } catch (error) {
            console.error("Error fetching supplier details:", error);
        }
    };

    useEffect(() => {
        fetchSupplierDetails();
    }, [supplierid]);

    return (
        <div>
            <StatusMain id={supplierid} />
            <Container>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={8}>
                        <Card elevation={3} style={{ padding: '16px' }}> {/* Add padding and elevation */}
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ marginBottom: '16px' }}>
                                    Order Tracker
                                </Typography>
                                <OrderTracker data={myOrder} />
                            </CardContent>
                  
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Supplierhome;
