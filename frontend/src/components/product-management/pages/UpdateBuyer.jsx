import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import updateBuyer from "../services/axios-update-buyer.js";  // Ensure this service handles the update operation correctly

const UpdateBuyer = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const buyer = location.state.buyer;

    // Initialize state with buyer data, including the MongoDB _id
    const [buyerData, setBuyerData] = useState({
        _id: buyer._id, // MongoDB-generated ID
        fName: buyer.fName,
        lName: buyer.lName,
        position: buyer.position,
        company: buyer.company,
        companyAddress: buyer.companyAddress,
        telephone: buyer.telephone,
        email: buyer.email,
        password: buyer.password,
        confirmPassword: buyer.confirmPassword
    });

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setBuyerData({ ...buyerData, [name]: value });
    };

    // Submit form data to update buyer
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateBuyer(buyerData);  // Sends the buyer data to your update service
            navigateTo('/admin/buyer/ManageBuyer');  // Navigate to buyers list after successful update
        } catch (error) {
            console.error("Error updating buyer:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Update Buyer</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        name="_id"  // MongoDB _id field (read-only)
                        value={buyerData._id}
                        placeholder="Buyer ID"
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                    />
                    <input
                        name="fName"
                        value={buyerData.fName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="lName"
                        value={buyerData.lName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="position"
                        value={buyerData.position}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="company"
                        value={buyerData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="companyAddress"
                        value={buyerData.companyAddress}
                        onChange={handleChange}
                        placeholder="Company Address"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="telephone"
                        value={buyerData.telephone}
                        onChange={handleChange}
                        placeholder="Telephone"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="email"
                        value={buyerData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="password"
                        type="password"
                        value={buyerData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        value={buyerData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Confirm Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBuyer;
