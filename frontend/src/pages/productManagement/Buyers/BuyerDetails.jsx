import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:3001/api/buyers/";

const fetchHandler = async (setBuyerDetails) => {
    try {
        const response = await axios.get(URL);
        setBuyerDetails(response.data);
    } catch (error) {
        console.error("Error fetching buyer details: ", error);
    }
}

function BuyerDetails() {
    const [buyerDetails, setBuyerDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const navigate = useNavigate();
    const ComponentsRef = useRef();

    useEffect(() => {
        fetchHandler(setBuyerDetails);
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}${id}`);
            fetchHandler(setBuyerDetails);
        } catch (error) {
            console.error("Error deleting buyer: ", error);
        }
    }

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Buyer Details Report",
        onAfterPrint: () => console.log("Buyer Details Printed successfully!")
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery === "") {
            fetchHandler(setBuyerDetails);
        } else {
            const filteredBuyers = buyerDetails.filter((buyer) => {
                return buyer.fName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.lName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.companyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.telephone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    buyer.email.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setBuyerDetails(filteredBuyers.length > 0 ? filteredBuyers : []);
            setNoResults(filteredBuyers.length === 0);
        }
    }

    return (
        <div ref={ComponentsRef}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Buyer Details</h1>
                    <form onSubmit={handleSearch} className="mb-6 flex justify-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search buyers..."
                            className="p-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Search
                        </button>
                    </form>
                    {noResults && <p className="text-center text-red-500">No buyers found matching your search.</p>}
                    {buyerDetails.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse">
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
                                        <tr key={buyer._id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{buyer._id}</td>
                                            <td className="py-3 px-6 text-left">{buyer.fName}</td>
                                            <td className="py-3 px-6 text-left">{buyer.lName}</td>
                                            <td className="py-3 px-6 text-left">{buyer.position}</td>
                                            <td className="py-3 px-6 text-left">{buyer.company}</td>
                                            <td className="py-3 px-6 text-left">{buyer.companyAddress}</td>
                                            <td className="py-3 px-6 text-left">{buyer.telephone}</td>
                                            <td className="py-3 px-6 text-left">{buyer.email}</td>
                                            <td className="py-3 px-6 text-left">
                                                <button
                                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors duration-200"
                                                    onClick={() => handleDelete(buyer._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center">No buyers found</p>
                    )}
                    <div className="flex justify-center">
                        <button
                            onClick={handlePrint}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerDetails;
