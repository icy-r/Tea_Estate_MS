import { useState } from 'react';
import React from 'react';
import axios from '../../../services/axios.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../services/firebase.js';
import { Snackbar, Alert } from '@mui/material'; // Import Material UI components

function SendPdf() {
    const [name, setName] = useState("");     // State for Name
    const [email, setEmail] = useState("");   // State for Email
    const [nic, setNic] = useState("");       // State for NIC
    const [file, setFile] = useState(null);   // State for PDF File
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity ('success', 'error')

    // Function to handle file input change
    const saveFile = (file) => {
        setFile(file);
    };

    // Close Snackbar handler
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Form submission handler
    const submitpdf = async (e) => {
        e.preventDefault();

        if (!file) {
            setSnackbarMessage("Please select a file before uploading.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            // Create a storage reference with a unique filename
            const storageRef = ref(storage, `uploads/${Date.now()}`);
            const uploadTask = await uploadBytes(storageRef, file); // Upload the file to Firebase storage
            const fileUrl = await getDownloadURL(uploadTask.ref);   // Get the file URL from Firebase

            const payload = {
                name,
                email,
                nic,
                file: fileUrl
            };

            console.log("Payload:", { name, email, nic, fileUrl });

            // Make the API request to store PDF metadata in the backend
            const result = await axios.post("http://localhost:3001/api/applicantManagement/", payload, {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE' 
                },
            });

            if (result.status === 201 || result.status === 200) {
                // Show success message on successful upload
                setSnackbarMessage("Uploaded successfully");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (error) {
            console.error("Error Uploading: " + error.message);
            // Show error message if anything fails during the process
            setSnackbarMessage("Upload failed: " + error.message);
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload PDF</h1>
            <form onSubmit={submitpdf} className="space-y-4">

                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your email"
                    />
                </div>

                {/* NIC Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">NIC</label>
                    <input
                        required
                        type="text"
                        value={nic}
                        pattern=".{12,12}"
                        onChange={(e) => setNic(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your NIC"
                    />
                </div>

                {/* PDF File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
                    <input
                        required
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => saveFile(e.target.files[0])}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Upload PDF
                    </button>
                </div>
            </form>

            {/* Snackbar to show success or error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SendPdf;
