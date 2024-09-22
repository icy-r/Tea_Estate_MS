import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js';

const Signup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
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

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", inputs);
        sendRequest().then(() => {
            navigate('/BuyerDetails');
        }).catch((error) => {
            console.error("Error during signup", error);
        });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/buyers/", {
                fName: String(inputs.fName),
                lName: String(inputs.lName),
                position: String(inputs.position),
                company: String(inputs.company),
                companyAddress: String(inputs.companyAddress),
                telephone: String(inputs.telephone),
                email: String(inputs.email),
                password: String(inputs.password),
                confirmPassword: String(inputs.confirmPassword),
            });
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup for free</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6"> {/* Single-column layout */}
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="fName"
                                onChange={handleChange}
                                value={inputs.fName}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lName"
                                onChange={handleChange}
                                value={inputs.lName}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Position</label>
                            <input
                                type="text"
                                name="position"
                                onChange={handleChange}
                                value={inputs.position}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Company</label>
                            <input
                                type="text"
                                name="company"
                                onChange={handleChange}
                                value={inputs.company}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Company Address</label>
                            <input
                                type="text"
                                name="companyAddress"
                                onChange={handleChange}
                                value={inputs.companyAddress}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Telephone</label>
                            <input
                                type="tel"
                                name="telephone"
                                onChange={handleChange}
                                value={inputs.telephone}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={inputs.email}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={inputs.confirmPassword}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-black py-2 px-4 rounded-md hover:bg-primary-dark mt-6">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
