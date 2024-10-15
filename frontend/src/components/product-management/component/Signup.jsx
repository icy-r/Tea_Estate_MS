import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

export default function CreateBuyer() {
    const [buyerData, setBuyerData] = useState({
        id: "",  
        fName: "",
        lName: "",
        position: "",
        company: "",
        companyAddress: "",
        telephone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {

        axios.get('/buyers')
            .then((response) => {
                const buyer = response.data;  
                setBuyerData({
                    ...buyer, 
                    id: buyer.id,
                });
            })
            .catch((error) => {
                console.error("There was an error fetching the buyer!", error);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBuyerData({ ...buyerData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (buyerData.id) {
                // Update existing buyer
                const response = await axios.put(`/buyers/${buyerData.id}`, {
                    fName: buyerData.fName,
                    lName: buyerData.lName,
                    position: buyerData.position,
                    company: buyerData.company,
                    companyAddress: buyerData.companyAddress,
                    telephone: buyerData.telephone,
                    email: buyerData.email,
                    password: buyerData.password,
                    confirmPassword: buyerData.confirmPassword
                });
                console.log("Buyer updated:", response.data);
            } else {
                // Create a new buyer
                const response = await axios.post('/buyers', {
                    fName: buyerData.fName,
                    lName: buyerData.lName,
                    position: buyerData.position,
                    company: buyerData.company,
                    companyAddress: buyerData.companyAddress,
                    telephone: buyerData.telephone,
                    email: buyerData.email,
                    password: buyerData.password,
                    confirmPassword: buyerData.confirmPassword
                });
                console.log("Buyer created:", response.data);
            }
        } catch (error) {
            console.error("Error processing the buyer:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                        value={buyerData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="confirmPassword"
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
