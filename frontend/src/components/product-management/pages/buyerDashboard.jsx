import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import bop from '@assets/product/BOP.jpg';

const BuyerDashboard = () => {
    return (
        <div className="bg-green-100 min-h-screen flex flex-col justify-center items-center">
            {/* Main Container */}
            <Container maxWidth="lg" className="text-center py-16">
                <Typography variant="h2" className="text-green-900 font-bold mb-8">
                    Welcome to the Bio Tea Estate Marketplace
                </Typography>

                <img
                    src={bop}
                    alt="Tea Field"
                    className="w-full h-64 object-cover mb-8 rounded-lg shadow-lg"
                />

                {/* Introduction Text */}
                <Typography variant="h6" className="text-gray-700 mb-4 leading-relaxed" >
                    Connect with us to experience the finest selection of premium teas directly from
                    our estate. We specialize in delivering high-quality teas to wholesale buyers,
                    providing you with the freshest, sustainably grown tea leaves at competitive prices.
                </Typography>

                <Typography variant="body1" className="text-gray-600 mb-6">
                    As a tea estate dedicated to excellence, we believe in fostering long-term
                    partnerships with buyers who share our passion for quality and sustainability. Here’s
                    why you’ll love working with us:
                </Typography>

                {/* Reasons to Connect */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Reason 1 */}
                    <div className="p-6 bg-white shadow-md rounded-md flex flex-col items-center">
                        <img
                            src=""
                            alt="Sustainable Farming"
                            className="h-32 w-32 mb-4 rounded-full object-cover"
                        />
                        <Typography variant="h6" className="font-semibold mb-2">
                            Sustainable Farming
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            We are committed to eco-friendly and sustainable farming practices, ensuring
                            the best quality teas while preserving the environment.
                        </Typography>
                    </div>

                    {/* Reason 2 */}
                    <div className="p-6 bg-white shadow-md rounded-md flex flex-col items-center">
                        <img
                            src=""
                            alt="Handpicked Teas"
                            className="h-32 w-32 mb-4 rounded-full object-cover"
                        />
                        <Typography variant="h6" className="font-semibold mb-2">
                            Handpicked Excellence
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            Our teas are handpicked by experienced professionals, ensuring only the
                            finest leaves make it into your cup.
                        </Typography>
                    </div>

                    {/* Reason 3 */}
                    <div className="p-6 bg-white shadow-md rounded-md flex flex-col items-center">
                        <img
                            src=""
                            alt="Global Partnerships"
                            className="h-32 w-32 mb-4 rounded-full object-cover"
                        />
                        <Typography variant="h6" className="font-semibold mb-2">
                            Global Partnerships
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            We work with buyers globally, offering seamless shipping and personalized
                            support, so you can focus on your business.
                        </Typography>
                    </div>
                </div>

                {/* Call to Action */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md shadow-md"
                >
                    Connect with Us Today
                </Button>
            </Container>

            
        </div>
    );
};

export default BuyerDashboard;
