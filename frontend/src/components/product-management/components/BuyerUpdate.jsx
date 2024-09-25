import React, { useEffect, useState } from "react";
import axios from '../../../services/axios.js';
import { useNavigate, useParams } from 'react-router-dom';

function BuyerUpdate() {
    const URL = "http://localhost:3001/api/buyers/";
    const navigate = useNavigate();
    const { id } = useParams();
    
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchHandler = async () => {
        try {
            const response = await axios.get(URL + id);
            const buyerData = response.data;

            setBuyerDetails({
                fName: buyerData.firstName || '',
                lName: buyerData.lastName || '',
                position: buyerData.position || '',
                company: buyerData.company || '',
                companyAddress: buyerData.companyAddress || '',
                telephone: buyerData.telephone || '',
                email: buyerData.email || '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error("Error fetching buyer details", error);
            setError("Failed to load buyer details");
        } finally {
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
                fName: buyerDetails.fName,
                lName: buyerDetails.lName,
                position: buyerDetails.position,
                company: buyerDetails.company,
                companyAddress: buyerDetails.companyAddress,
                telephone: buyerDetails.telephone,
                email: buyerDetails.email,
                ...(buyerDetails.password && { password: buyerDetails.password })
            });
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buyerDetails.password && buyerDetails.password !== buyerDetails.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(null);
        setSubmitting(true);

        sendRequest()
            .then(() => {
                navigate('/BuyerDetails');
            })
            .catch((error) => {
                setError("Error during buyer update");
            })
            .finally(() => setSubmitting(false));
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
                        disabled={submitting}
                        className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Updating...' : 'Update Buyer'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BuyerUpdate;
