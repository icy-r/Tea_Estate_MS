import { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Snackbar,
    Alert,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
} from "@mui/material";
import createSupplier from "../services/axios-suppliercreate.js"; // Import the correct function

export default function SupplierForm() {
    const [formValues, setFormValues] = useState({
        id: '',
        fname: '',
        lname: '',
        nic: '',
        companyAddress: '',
        supplyType: '',
        password: '',
        companyName: '',
        contactNum: '',
        email: '',
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [darkMode, setDarkMode] = useState(false);
    const [nicError, setNicError] = useState('');
    const [contactError, setContactError] = useState('');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        // Reset error messages on input change
        if (name === 'nic') {
            setNicError('');
        } else if (name === 'contactNum') {
            setContactError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate NIC and Contact Number
        let valid = true;

        if (formValues.nic.length !== 12) {
            setNicError('NIC number must be exactly 12 digits.');
            valid = false;
        }

        if (formValues.contactNum.length < 10) {
            setContactError('Contact number must be at least 10 digits.');
            valid = false;
        }

        if (!valid) {
            return; // Stop the form submission if there are validation errors
        }

        try {
            await createSupplier(formValues, setFormValues, 'add');
            setAlert({ open: true, message: "Supplier created successfully!", severity: "success" });
            setFormValues({ id: '', fname: '', lname: '', nic: '', companyAddress: '', supplyType: '', password: '', companyName: '', contactNum: '', email: '' });
        } catch (error) {
            setAlert({ open: true, message: "Error creating supplier. Please try again.", severity: "error" });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, message: '', severity: 'success' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                        Add Supplier
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
                    {/* Supplier ID */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supplier ID</FormLabel>
                        <Input
                            name="id"
                            value={formValues.id}
                            onChange={handleChange}
                            placeholder="Supplier ID"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* First Name */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>First Name</FormLabel>
                        <Input
                            name="fname"
                            value={formValues.fname}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Last Name</FormLabel>
                        <Input
                            name="lname"
                            value={formValues.lname}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* NIC */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>NIC</FormLabel>
                        <Input
                            name="nic"
                            value={formValues.nic}
                            onChange={handleChange}
                            placeholder="NIC"
                            className={`w-full p-2 border border-gray-300 rounded ${nicError ? 'border-red-500' : ''}`}
                            required
                        />
                        {nicError && <p className="text-red-500 text-sm">{nicError}</p>}
                    </div>

                    {/* Company Address */}
                    <div className="mb-4 col-span-2">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Company Address</FormLabel>
                        <Input
                            name="companyAddress"
                            value={formValues.companyAddress}
                            onChange={handleChange}
                            placeholder="Company Address"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Supply Type */}
                    <div className="mb-4 col-span-2">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Supply Type</FormLabel>
                        <Select
                            name="supplyType"
                            value={formValues.supplyType}
                            onChange={handleChange}
                            placeholder="Supply Type"
                            displayEmpty
                            className="w-full border border-gray-300 rounded p-2"
                            required
                        >
                            <MenuItem value="" disabled>Select Supply Type</MenuItem>
                            <MenuItem value="fertilizer">Fertilizer</MenuItem>
                            <MenuItem value="chemicals">Chemicals</MenuItem>
                            <MenuItem value="fuel">Fuel</MenuItem>
                        </Select>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            value={formValues.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Company Name</FormLabel>
                        <Input
                            name="companyName"
                            value={formValues.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Contact Number</FormLabel>
                        <Input
                            name="contactNum"
                            value={formValues.contactNum}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            type="tel"
                            className={`w-full p-2 border border-gray-300 rounded ${contactError ? 'border-red-500' : ''}`}
                            required
                        />
                        {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <FormLabel className={`block ${darkMode ? "text-white" : "text-gray-700"}`}>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="col-span-2 flex justify-between mt-4">
                        <Button type="submit" variant="contained" color="primary">Create Supplier</Button>
                    </div>
                </form>

                {/* Snackbar for Alerts */}
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
