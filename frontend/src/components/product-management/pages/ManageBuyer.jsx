import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const ManageBuyer = () => {
    const [buyers, setBuyers] = useState([]);
    const navigateTo = useNavigate();
    
    // Fetch buyer details from the API
    const fetchDetails = async () => {
        try {
            const response = await axios.get("/buyers/");
            console.log(response.data);  // Debugging: Check if the response has correct data
            setBuyers(response.data);    // Set the buyers state
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };
    
    // Fetch details on component mount
    useEffect(() => {
        fetchDetails();
    }, []);
    
    // Handle update button click, navigating to the update page
    const handleUpdate = (buyer) => {
        console.log("Buyer ID:", buyer._id); 
        navigateTo(`/admin/buyer/manageBuyer/${buyer._id}`, { state: { buyer } });
    };
    
    // Handle delete button click, deleting a buyer by id
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/buyers/${id}`);  // Send DELETE request to API
            alert("Buyer deleted successfully");
            // Filter out the deleted buyer from the buyers state
            setBuyers(buyers.filter((buyer) => buyer._id !== id));
        } catch (error) {
            console.error("Error deleting buyer:", error);
        }
    };

    // Function to generate sequential buyer ID (e.g., B01, B02, etc.)
    const generateBuyerID = (index) => {
        const idNumber = (index + 1).toString().padStart(2, '0'); // Ensure it is two digits (01, 02, etc.)
        return `B${idNumber}`;
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Buyer Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-teal-500 text-white">
                            <th className="py-2 px-4 text-left">Custom Buyer ID</th>
                            <th className="py-2 px-4 text-left">Buyer First Name</th>
                            <th className="py-2 px-4 text-left">Buyer Last Name</th>
                            <th className="py-2 px-4 text-left">Position</th>
                            <th className="py-2 px-4 text-left">Company</th>
                            <th className="py-2 px-4 text-left">Company Address</th>
                            <th className="py-2 px-4 text-left">Telephone</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.length > 0 ? (
                            buyers.map((buyer, index) => (
                                <tr key={buyer._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border">{generateBuyerID(index)}</td>
                                    <td className="py-2 px-4 border">{buyer.fName}</td>
                                    <td className="py-2 px-4 border">{buyer.lName}</td>
                                    <td className="py-2 px-4 border">{buyer.position}</td>
                                    <td className="py-2 px-4 border">{buyer.company}</td>
                                    <td className="py-2 px-4 border">{buyer.companyAddress}</td>
                                    <td className="py-2 px-4 border">{buyer.telephone}</td>
                                    <td className="py-2 px-4 border">{buyer.email}</td>
                                    <td className="py-2 px-4 border text-center">
                                        <button
                                            onClick={() => handleUpdate(buyer)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(buyer._id)}  // Correct use of _id here
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-2 px-4 border text-center">
                                    No buyers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBuyer;
