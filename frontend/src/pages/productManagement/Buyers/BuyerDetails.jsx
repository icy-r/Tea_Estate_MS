import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';

const URL = "http://localhost:3001/api/buyers/";

const fetchHandler = async (setBuyerDetails) => {
    try {
        const response = await axios.get(URL);
        setBuyerDetails(response.data);
    } catch (error) {
        console.error(error);
    }
}


function BuyerDetails() {
    const [buyerDetails, setBuyerDetails] = useState([]);

    useEffect(() => {   
        fetchHandler(setBuyerDetails);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Buyer Details</h1>
                {buyerDetails.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Buyer ID</th>
                                <th className="py-3 px-6 text-left">First Name</th>
                                <th className="py-3 px-6 text-left">Last Name</th>
                                <th className="py-3 px-6 text-left">Position</th>
                                <th className="py-3 px-6 text-left">Company</th>
                                <th className="py-3 px-6 text-left">Company Address</th>
                                <th className="py-3 px-6 text-left">Telephone</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {buyerDetails.map((buyer) => (
                                <tr key={buyer._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{buyer._id}</td>
                                    <td className="py-3 px-6 text-left">{buyer.fName}</td>
                                    <td className="py-3 px-6 text-left">{buyer.lName}</td>
                                    <td className="py-3 px-6 text-left">{buyer.position}</td>
                                    <td className="py-3 px-6 text-left">{buyer.company}</td>
                                    <td className="py-3 px-6 text-left">{buyer.companyAddress}</td>
                                    <td className="py-3 px-6 text-left">{buyer.telephone}</td>
                                    <td className="py-3 px-6 text-left">{buyer.email}</td>
                                    <td className="py-3 px-6 text-left">
                                    <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700"
                                            onClick={() => handleDelete(buyer._id)} > Delete
                                        </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No buyers found</p>
                )}
            </div>
        </div>
    );
}

export default BuyerDetails;
