import React, { useState, useEffect } from 'react';
import CallingSupplyForm from '../components/CallingSupplyForm.jsx';
import CallingSupplyList from '../components/CallingSupplyList.jsx';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "../../../services/axios.js"; // Axios instance

const CallingSupply = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [callingSupplies, setCallingSupplies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Fetch the calling supplies data initially
    const fetchCallingSupplies = async () => {
        try {
            const response = await axios.get('/callingSupply/'); // Replace with correct API endpoint
            setCallingSupplies(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching calling supplies:", error);
        }
    };

    // Fetch the calling supplies when the component mounts
    useEffect(() => {
        fetchCallingSupplies();
    }, []);

    // Function to add new supply to the list after form submission
    const addNewSupply = (newSupply) => {
        setCallingSupplies((prevSupplies) => [...prevSupplies, newSupply]);
    };

    // Function to handle supply updates
    const updateSupply = (updatedSupply) => {
        setCallingSupplies((prevSupplies) =>
            prevSupplies.map((supply) =>
                supply.callingSupplyId === updatedSupply.callingSupplyId ? updatedSupply : supply
            )
        );
    };

    // Function to handle supply deletion
    const deleteSupply = (supplyId) => {
        setCallingSupplies((prevSupplies) =>
            prevSupplies.filter((supply) => supply.callingSupplyId !== supplyId)
        );
    };

    return (
        <div>
            {/* Button to open the form in a dialog */}
            <div className="flex justify-end mb-4">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenDialog} 
                    className="bg-teal-500 text-white"
                >
                    Create New Call
                </Button>
            </div>

            {/* Dialog for Calling Supply Form */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Create a New Calling Supply</DialogTitle>
                <DialogContent>
                    {/* Passing the addNewSupply function to the form */}
                    <CallingSupplyForm onAddSupply={addNewSupply} onCloseDialog={handleCloseDialog} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Display the CallingSupplyList below, passing the callingSupplies data */}
            <div className='px-20'>
                <CallingSupplyList 
                    callingSupplies={callingSupplies} 
                    loading={loading} 
                    onUpdateSupply={updateSupply} 
                    onDeleteSupply={deleteSupply}
                />
            </div>
        </div>
    );
};

export default CallingSupply;
