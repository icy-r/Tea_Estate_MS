import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

const ManagerDashboard = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 4 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Our Tea Marketplace
                </Typography>
                <Typography variant="h6" paragraph>
                    Discover the finest quality teas sourced from the best estates. 
                    Join us in promoting sustainable and eco-friendly practices.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Explore Our Teas
                </Button>
            </Box>

           

            {/* Sustainability Section */}
            <Paper sx={{ padding: 4, backgroundColor: '#ffffff' }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Our Commitment to Sustainability
                </Typography>
                <Typography variant="body1" paragraph>
                    We believe in promoting sustainable practices by offering eco-friendly packaging, 
                    supporting local farmers, and ensuring fair trade practices.
                </Typography>
                <Typography variant="body1" paragraph>
                    Together, we can make a positive impact on our environment and the tea industry.
                </Typography>
                <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                    Learn More
                </Button>
            </Paper>

            {/* Call to Action Section */}
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Ready to Experience Quality Teas?
                </Typography>
                <Button variant="contained" color="secondary" size="large">
                    Join Our Community
                </Button>
            </Box>
        </Box>
    );
};

export default ManagerDashboard;


