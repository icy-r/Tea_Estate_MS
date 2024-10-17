import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../../../services/axios.js';  // Adjust this to your correct axios service path
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewPdfs({ refresh }) {
    const [pdfList, setPdfList] = useState([]);  // State to hold all PDF data
    const [loading, setLoading] = useState(true); // State to show loading spinner or message
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to manage the delete dialog
    const [selectedPdfId, setSelectedPdfId] = useState(null); // State to track the selected PDF for deletion

    // Snackbar states
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message to display in Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severity type (success or error)

    // Function to fetch the PDF data from the API
    const fetchPdfs = async () => {
        setLoading(true);  // Set loading to true before fetching
        try {
            const result = await axios.get('http://localhost:3001/api/applicantManagement/', {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            });
            // Map over result data to include a status property
            const updatedPdfs = result.data.map(pdf => ({
                ...pdf,
                status: 'Pending'  // Set initial status to 'Pending'
            }));
            setPdfList(updatedPdfs);  // Store the fetched data in the state
            
            // Load existing statuses from local storage
            const storedStatuses = JSON.parse(localStorage.getItem('pdfStatuses')) || {};
            const updatedPdfsWithStatus = updatedPdfs.map(pdf => ({
                ...pdf,
                status: storedStatuses[pdf._id] || 'Pending' // Set status from localStorage if exists
            }));
            setPdfList(updatedPdfsWithStatus);
        } catch (error) {
            console.error("Error fetching PDFs: " + error.message);
        } finally {
            setLoading(false);  // Set loading to false after the fetch completes
        }
    };

    // Function to delete a PDF
    const deletePdf = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/applicantManagement/${id}`, {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            });

            if (response.status === 200) {
                setSnackbarMessage('PDF deleted successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchPdfs();  // Re-fetch the updated list of PDFs
            }
        } catch (error) {
            console.error("Error deleting PDF: " + error.message);
            setSnackbarMessage('Failed to delete PDF');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Handle delete button click to open the confirmation dialog
    const handleDeleteClick = (id) => {
        setSelectedPdfId(id);
        setDeleteDialogOpen(true); // Open the confirmation dialog
    };

    // Confirm delete and close the dialog
    const handleConfirmDelete = () => {
        if (selectedPdfId) {
            deletePdf(selectedPdfId);  // Call the delete function
        }
        setDeleteDialogOpen(false); // Close the confirmation dialog
        setSelectedPdfId(null); // Reset the selected PDF ID
    };

    // Cancel delete and close the dialog
    const handleCancelDelete = () => {
        setDeleteDialogOpen(false); // Close the confirmation dialog
        setSelectedPdfId(null); // Reset the selected PDF ID
    };

    // Close Snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // Re-fetch the data whenever the 'refresh' prop changes
    useEffect(() => {
        fetchPdfs();  // Fetch the PDFs initially and on 'refresh' change
    }, [refresh]);

    // Function to handle the PDF download/view
    const handleDownload = (fileUrl, id) => {
        window.open(fileUrl, '_blank');  // Opens the PDF in a new tab
        // Update the status in the pdfList
        setPdfList(prevList =>
            prevList.map(pdf => {
                if (pdf._id === id) {
                    // Update the status in local storage
                    const storedStatuses = JSON.parse(localStorage.getItem('pdfStatuses')) || {};
                    storedStatuses[id] = 'Downloaded';
                    localStorage.setItem('pdfStatuses', JSON.stringify(storedStatuses));
                    return { ...pdf, status: 'Downloaded' };
                }
                return pdf;
            })
        );
    };

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto">
                <div className="bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">Uploaded PDFs</h1>
                    <h2 className="text-xl text-gray-600 mb-8 text-left">PDF Details Page</h2>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>  // Display loading message while fetching
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="overflow-y-auto" style={{ maxHeight: '450px' }}> {/* Adjust height as needed */}
                                <table className="w-[100%] mx-auto bg-white border border-gray-200">
                                    <thead>
                                        <tr style={{ backgroundColor: '#1AACAC' }} className="text-white uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-left">Email</th>
                                            <th className="py-3 px-6 text-left">NIC</th>
                                            <th className="py-3 px-6 text-left">PDF File</th>
                                            <th className="py-3 px-6 text-left">Status</th>
                                            <th className="py-3 px-6 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {pdfList.length > 0 ? (
                                            pdfList.map((pdf) => (
                                                <tr key={pdf._id} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-6">{pdf.name}</td>
                                                    <td className="py-3 px-6">{pdf.email}</td>
                                                    <td className="py-3 px-6">{pdf.nic}</td>
                                                    <td className="py-3 px-6">
                                                        <button
                                                            onClick={() => handleDownload(pdf.file, pdf._id)}
                                                            className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            Download PDF
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-6">{pdf.status}</td> {/* Status Column */}
                                                    <td className="py-3 px-6 flex space-x-2">
                                                        <button
                                                            onClick={() => handleDeleteClick(pdf._id)}
                                                            className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                                    No PDFs uploaded yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this PDF?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ViewPdfs;
