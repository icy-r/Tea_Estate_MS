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

    const [errors, setErrors] = useState({}); // State to store validation errors

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validateInputs = () => {
        const newErrors = {};

        const lettersRegex = /^[A-Za-z]+$/;

        if (!inputs.fName.trim()) {
            newErrors.fName = "First name is required.";
        } else if (!lettersRegex.test(inputs.fName)) {
            newErrors.fName = "First name can only contain letters.";
        }

        if (!inputs.lName.trim()) {
            newErrors.lName = "Last name is required.";
        } else if (!lettersRegex.test(inputs.lName)) {
            newErrors.lName = "Last name can only contain letters.";
        }

        if (!inputs.position.trim()) {
            newErrors.position = "Position is required.";
        } else if (!lettersRegex.test(inputs.position)) {
            newErrors.position = "Position can only contain letters.";
        }

        if (!inputs.company.trim()) {
            newErrors.company = "Company name is required.";
        }

        if (!inputs.companyAddress.trim()) {
            newErrors.companyAddress = "Company address is required.";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(inputs.telephone)) {
            newErrors.telephone = "Telephone number must be 10 digits.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email)) {
            newErrors.email = "Invalid email format.";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(inputs.password)) {
            newErrors.password = "Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character.";
        }

        if (inputs.password !== inputs.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        setErrors(validationErrors);

        // If there are errors, do not proceed with submission
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

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
        <div className="flex flex-col md:flex-row h-screen">

            {/* Left section with logo and system description */}
            <div className="md:w-1/3 w-full bg-color_focus text-white flex flex-col justify-center items-center p-8">
            <img src="../src/assets/logo.png" alt="logo" className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8" />
        <div className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">Tea Estate</div>
        <div className="text-2xl md:text-4xl font-bold mb-2">Manage and Handle</div>
        <div className="text-sm md:text-lg text-center">Fully functional tea estate management system</div>
            </div>

            {/* Right section with signup form */}
            <div className="md:w-2/3 w-full flex justify-center items-center p-4 md:p-0">
                <div className="w-full max-w-lg bg-white rounded-lg p-8 md:p-10 shadow-lg">
                <img src="../src/assets/logo.png" alt="logo" className="w-5 h-5" />
                <div className="font-bold mb-2"> Tea Estate</div>
                <div className="text-xl  text-color_focus mb-4">Signup into System</div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Two-column layout for most fields */}
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="fName"
                                    onChange={handleChange}
                                    value={inputs.fName}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.fName && <p className="text-red-500 text-sm">{errors.fName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lName"
                                    onChange={handleChange}
                                    value={inputs.lName}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.lName && <p className="text-red-500 text-sm">{errors.lName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    onChange={handleChange}
                                    value={inputs.position}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    onChange={handleChange}
                                    value={inputs.company}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700">Company Address</label>
                                <input
                                    type="text"
                                    name="companyAddress"
                                    onChange={handleChange}
                                    value={inputs.companyAddress}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Telephone</label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    onChange={handleChange}
                                    value={inputs.telephone}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={inputs.email}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={inputs.password}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={inputs.confirmPassword}
                                    required
                                    className="block w-full h-7 px-3 bg-white border border-gray-300 rounded-md"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-4 p-2 bg-color_focus text-white rounded-md">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
