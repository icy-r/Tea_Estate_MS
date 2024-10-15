import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CreateBuyer() {
    const navigate = useNavigate(); // Initialize the navigate function
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch the buyer data if needed (optional)
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
        setErrors({ ...errors, [name]: "" }); // Clear the error for the field being changed
    };

    const validateForm = () => {
        const newErrors = {};
        if (!buyerData.fName) newErrors.fName = "First name is required";
        if (!buyerData.lName) newErrors.lName = "Last name is required";
        if (!buyerData.position) newErrors.position = "Position is required";
        if (!buyerData.company) newErrors.company = "Company name is required";
        if (!buyerData.companyAddress) newErrors.companyAddress = "Company address is required";
        if (!buyerData.telephone) newErrors.telephone = "Telephone is required";
        if (!buyerData.email) newErrors.email = "Email is required";
        if (!buyerData.password) newErrors.password = "Password is required";
        if (buyerData.password !== buyerData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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

            // Navigate to Profile after processing buyer data
            navigate('/admin/buyer/Profile');
        } catch (error) {
            console.error("Error processing the buyer:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-green-800">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        name="fName"
                        value={buyerData.fName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className={`border ${errors.fName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.fName && <p className="text-red-500">{errors.fName}</p>}
                    <input
                        name="lName"
                        value={buyerData.lName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className={`border ${errors.lName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.lName && <p className="text-red-500">{errors.lName}</p>}
                    <input
                        name="position"
                        value={buyerData.position}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                        className={`border ${errors.position ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.position && <p className="text-red-500">{errors.position}</p>}
                    <input
                        name="company"
                        value={buyerData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        required
                        className={`border ${errors.company ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.company && <p className="text-red-500">{errors.company}</p>}
                    <input
                        name="companyAddress"
                        value={buyerData.companyAddress}
                        onChange={handleChange}
                        placeholder="Company Address"
                        required
                        className={`border ${errors.companyAddress ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.companyAddress && <p className="text-red-500">{errors.companyAddress}</p>}
                    <input
                        name="telephone"
                        value={buyerData.telephone}
                        onChange={handleChange}
                        placeholder="Telephone"
                        required
                        className={`border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.telephone && <p className="text-red-500">{errors.telephone}</p>}
                    <input
                        name="email"
                        value={buyerData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    <input
                        name="password"
                        type="password" // Changed to password type
                        value={buyerData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                    <input
                        name="confirmPassword"
                        type="password" // Changed to password type
                        value={buyerData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
