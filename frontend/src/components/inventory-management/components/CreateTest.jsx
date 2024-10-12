import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import CreateTea from '../components/tea/CreateTea';
import CreateFert from './../components/fertilizer/CreateFert';
import CreateFuel from './../components/fuel/CreateFuel';
import CreateUtilities from './../components/utilities/CreateUtilities';
import axios from "../../../services/axios.js";

const CreateTest = () => {
    const [openTeaDialog, setOpenTeaDialog] = useState(false);
    const [openFertDialog, setOpenFertDialog] = useState(false);
    const [openFuelDialog, setOpenFuelDialog] = useState(false);
    const [openUtilityDialog, setOpenUtilityDialog] = useState(false);

    const handleOpenTea = () => setOpenTeaDialog(true);
    const handleCloseTea = () => setOpenTeaDialog(false);

    const handleOpenFert = () => setOpenFertDialog(true);
    const handleCloseFert = () => setOpenFertDialog(false);

    const handleOpenFuel = () => setOpenFuelDialog(true);
    const handleCloseFuel = () => setOpenFuelDialog(false);

    const handleOpenUtility = () => setOpenUtilityDialog(true);
    const handleCloseUtility = () => setOpenUtilityDialog(false);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Create Inventory
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '20px' }}>
                <Button 
                    variant="contained" 
                    onClick={handleOpenTea}
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                    Create Tea
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleOpenFert}
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                    Create Fertilizer
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleOpenFuel}
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                    Create Fuel
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleOpenUtility}
                    sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                >
                    Create Utility
                </Button>
            </Box>

            {/* Dialogs for each create form */}
            <CreateTea open={openTeaDialog} onClose={handleCloseTea} />
            <CreateFert open={openFertDialog} onClose={handleCloseFert} />
            <CreateFuel open={openFuelDialog} onClose={handleCloseFuel} />
            <CreateUtilities open={openUtilityDialog} onClose={handleCloseUtility} />
        </Box>
    );
};

export default CreateTest;
