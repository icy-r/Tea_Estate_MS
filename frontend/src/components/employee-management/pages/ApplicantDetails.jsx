import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../../../services/axios.js';  // Adjust this to your correct axios service path

function ViewPdfs({ refresh }) {
    const [pdfList, setPdfList] = useState([]);  // State to hold all PDF data
    const [loading, setLoading] = useState(true); // State to show loading spinner or message

    // Function to fetch the PDF data from the API
    const fetchPdfs = async () => {
        setLoading(true);  // Set loading to true before fetching
        try {
            const result = await axios.get('http://localhost:3001/api/applicanttManagement/', {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE'
                }
            });
            setPdfList(result.data);  // Store the fetched data in the state
        } catch (error) {
            console.error("Error fetching PDFs: " + error.message);
        } finally {
            setLoading(false);  // Set loading to false after the fetch completes
        }
    };

    // Function to delete a PDF
    const deletePdf = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this PDF?");
        if (!confirmDelete) return;  // Exit if user cancels the deletion

        try {
            const response = await axios.delete(`http://localhost:3001/api/applicanttManagement/${id}`, {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE'
                }
            });

            if (response.status === 200) {
                alert('PDF deleted successfully');
                fetchPdfs();  // Re-fetch the updated list of PDFs
            }
        } catch (error) {
            console.error("Error deleting PDF: " + error.message);
            alert('Failed to delete PDF');
        }
    };

    // Re-fetch the data whenever the 'refresh' prop changes
    useEffect(() => {
        fetchPdfs();  // Fetch the PDFs initially and on 'refresh' change
    }, [refresh]);

    // Function to handle the PDF download/view
    const handleDownload = (fileUrl) => {
        window.open(fileUrl, '_blank');  // Opens the PDF in a new tab
    };

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto">
                <div className="bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-left">Uploaded PDFs</h1>
                    <h2 className="text-xl text-gray-600 mb-8 text-left">PDF Details Page</h2>
    
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>  // Display loading message while fetching
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="overflow-y-auto" style={{ maxHeight: '450px' }}> {/* Adjust height as needed */}
                                <table className="w-[98%] mx-auto bg-white border border-gray-200">
                                    <thead>
                                    <tr style={{ backgroundColor: '#1AACAC' }} className="text-white uppercase text-sm leading-normal">                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-left">Email</th>
                                            <th className="py-3 px-6 text-left">NIC</th>
                                            <th className="py-3 px-6 text-left">PDF File</th>
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
                                                            onClick={() => handleDownload(pdf.file)}
                                                            className="bg-indigo-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            Download PDF
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-6 flex space-x-2">
                                                        <button
                                                            onClick={() => deletePdf(pdf._id)}
                                                            className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="py-4 text-center text-gray-500">
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
        </div>
    );
    
}

export default ViewPdfs;
