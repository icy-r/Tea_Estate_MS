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
    const { id } = useParams();  // Getting the buyer's ID from the URL
    const navigate = useNavigate();

    // Fetch the buyer details by ID
    const fetchHandler = async () => {
        try {
            const response = await axios.get(URL + id);  // Fetch a specific buyer
            setBuyerDetails(response.data);  // Set the buyer's data
        } catch (error) {
            console.error("Error fetching buyer details", error);
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
                password: String(buyerDetails.password),
                confirmPassword: String(buyerDetails.confirmPassword),
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
        console.log("Form Submitted", buyerDetails);
        sendRequest().then(() => {
            navigate('/BuyerDetails');
        }).catch((error) => {
            console.error("Error during buyer update", error);
        });
    };

    const handleChange = (e) => {
        setBuyerDetails((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <h1>Buyer Update</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="fName" 
                    value={buyerDetails.fName} 
                    onChange={handleChange} 
                    placeholder="First Name" 
                />
                <input 
                    type="text" 
                    name="lName" 
                    value={buyerDetails.lName} 
                    onChange={handleChange} 
                    placeholder="Last Name" 
                />
                <input 
                    type="text" 
                    name="position" 
                    value={buyerDetails.position} 
                    onChange={handleChange} 
                    placeholder="Position" 
                />
                <input 
                    type="text" 
                    name="company" 
                    value={buyerDetails.company} 
                    onChange={handleChange} 
                    placeholder="Company" 
                />
                <input 
                    type="text" 
                    name="companyAddress" 
                    value={buyerDetails.companyAddress} 
                    onChange={handleChange} 
                    placeholder="Company Address" 
                />
                <input 
                    type="text" 
                    name="telephone" 
                    value={buyerDetails.telephone} 
                    onChange={handleChange} 
                    placeholder="Telephone" 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={buyerDetails.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={buyerDetails.password} 
                    onChange={handleChange} 
                    placeholder="Password" 
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={buyerDetails.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Confirm Password" 
                />
                <button type="submit">Update Buyer</button>
            </form>
        </div>
    );
}

export default BuyerUpdate;
