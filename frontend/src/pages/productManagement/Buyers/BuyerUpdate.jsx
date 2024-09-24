import React, { useEffect, useState } from "react";
import axios from '../../../services/axios.js';
import { useNavigate, useParams } from 'react-router-dom';

function BuyerUpdate() {
    const URL = "http://localhost:3001/api/buyers/";
    const [buyerDetails, setBuyerDetails] = useState({
        fName: '',
        lName: '',
        position: '',
        company: '',
        companyAddress: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true); // For handling loading state
    const [error, setError] = useState(null);     // For handling errors

    const { id } = useParams(); // Getting the buyer's ID from the URL
    const navigate = useNavigate();

    // Fetch the buyer details by ID
    const fetchHandler = async () => {
        try {
            const response = await axios.get(URL + id); // Fetch a specific buyer
            setBuyerDetails(response.data); // Set the buyer's data
            setLoading(false); // Stop loading
        } catch (error) {
            console.error("Error fetching buyer details", error);
            setError("Failed to load buyer details");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchHandler();
        }
    }, [id]);

    const sendRequest = async () => {
        try {
            const response = await axios.put(URL + id, {
                fName: String(buyerDetails.fName),
                lName: String(buyerDetails.lName),
                position: String(buyerDetails.position),
                company: String(buyerDetails.company),
                companyAddress: String(buyerDetails.companyAddress),
                telephone: String(buyerDetails.telephone),
                email: String(buyerDetails.email),
                // Send password only if it's updated
                ...(buyerDetails.password && { password: String(buyerDetails.password) }),
                ...(buyerDetails.confirmPassword && { confirmPassword: String(buyerDetails.confirmPassword) }),
            });
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buyerDetails.password !== buyerDetails.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(null); // Reset errors if form is valid
        sendRequest().then(() => {
            navigate('/BuyerDetails');
        }).catch((error) => {
            setError("Error during buyer update");
            console.error("Error during buyer update", error);
        });
    };

    const handleChange = (e) => {
        setBuyerDetails((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    if (loading) {
        return <div>Loading buyer details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Update Buyer</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="fName"
                        value={buyerDetails.fName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="lName"
                        value={buyerDetails.lName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="position"
                        value={buyerDetails.position}
                        onChange={handleChange}
                        placeholder="Position"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="company"
                        value={buyerDetails.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="companyAddress"
                        value={buyerDetails.companyAddress}
                        onChange={handleChange}
                        placeholder="Company Address"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="telephone"
                        value={buyerDetails.telephone}
                        onChange={handleChange}
                        placeholder="Telephone"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        value={buyerDetails.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        value={buyerDetails.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={buyerDetails.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Buyer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BuyerUpdate;
