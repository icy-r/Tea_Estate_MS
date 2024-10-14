import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import ReadTea from '../components/tea/ReadTea'; // Ensure this path is correct
import ReadFert from '../components/fertilizer/ReadFert'; // This is the correct component
import ReadFuel from '../components/fuel/ReadFuel'; // Import ReadFuel
import ReadUtilities from '../components/utilities/ReadUtilities'; // Import ReadUtilities

const ReadInventory = () => {
    const [currentTable, setCurrentTable] = useState(null);

    const handleShowTable = (table) => {
        setCurrentTable(table);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" className="font-semibold mb-4">Inventory Management</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '20px', marginBottom: '20px' }}>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                    onClick={() => handleShowTable('tea')}
                >
                    Tea
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                    onClick={() => handleShowTable('fertilizer')}
                >
                    Fertilizer
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                    onClick={() => handleShowTable('fuel')}
                >
                    Fuel
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                    onClick={() => handleShowTable('utility')}
                >
                    Utility
                </Button>
            </Box>

            {/* Conditionally render the appropriate table based on currentTable */}
            {currentTable === 'tea' && <ReadTea />}
            {currentTable === 'fertilizer' && <ReadFert />}
            {currentTable === 'fuel' && <ReadFuel />}
            {currentTable === 'utility' && <ReadUtilities />} {/* Render ReadUtilities here */}
        </Box>
    );
};

export default ReadInventory;
