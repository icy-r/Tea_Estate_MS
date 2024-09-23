import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../../services/axios.js';

function SendPdf() {
    const [name, setName] = useState("");     // State for Name
    const [email, setEmail] = useState("");   // State for Email
    const [nic, setNic] = useState("");       // State for NIC
    const [file, setFile] = useState("");     // State for PDF File
    const [allPdf, setAllPdf] = useState(""); // State to store all PDFs

    useEffect(() => {
        getpdf();
    }, []);

    // Function to fetch existing PDFs
    const getpdf = async () => { 
        const result = await axios.get("/pdf");
        console.log(result.data.data);
        setAllPdf(result.data.data);
    };

    // Function to handle file input change
    const saveFile = (file) => {
        setFile(file);
    };

    // Form submission handler
    const submitpdf = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("nic", nic);
        formData.append("file", file);
        console.log({ name, email, nic, file });
    
        try {
            const result = await axios.post("/pdf", formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log(result);

            if (result.data.status === 200) {
                alert("Uploaded successfully");
                getpdf(); // Fetch updated PDFs after successful upload
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Error Uploading: " + error.message);
            alert("Upload failed");
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
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Upload PDF
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SendPdf;
