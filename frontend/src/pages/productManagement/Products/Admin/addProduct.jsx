import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../services/axios';

const AddProduct = () => {  
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        quality: "",   
        quantity: "",
        unitPrice: "",
        description: "",
        aucDate: "",
        aucTime: "",
        image: "",
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
            navigate('/MarketPlace');
        }).catch((error) => {
            console.error("Error during product addition", error);
        });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/catalog/", {
                quality: String(inputs.quality),
                quantity: String(inputs.quantity),
                unitPrice: String(inputs.unitPrice),
                description: String(inputs.description),
                aucDate: String(inputs.aucDate),
                aucTime: String(inputs.aucTime),
                image: String(inputs.image),
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
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quality">
                            Quality
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quality"
                            name="quality"
                            onChange={handleChange}
                        >
                            <option value="">Select quality</option>
                            <option value="Flowery Orange Pekoe (FOP)">Flowery Orange Pekoe (FOP)</option>
                            <option value="Orange Pekoe (OP)">Orange Pekoe (OP)</option>
                            <option value="Pekoe (P)">Pekoe (P)</option>
                            <option value="Broken Orange Pekoe (BOP)">Broken Orange Pekoe (BOP)</option>
                            <option value="Broken Pekoe (BP)">Broken Pekoe (BP)</option>
                            <option value="Broken Pekoe Fanning (BPF)">Broken Pekoe Fanning (BPF)</option>
                            <option value="Pekoe Fannings (PF)">Pekoe Fannings (PF)</option>
                            <option value="Dust Fannings (D)">Dust Fannings (D)</option>
                            <option value="Golden Tips">Golden Tips</option>
                            <option value="Silver Tips (White Tea)">Silver Tips (White Tea)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quantity"
                            name="quantity"
                            type="text"
                            placeholder="Enter quantity"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitPrice">
                            Unit Price
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="unitPrice"
                            name="unitPrice"
                            type="text"
                            placeholder="Enter unit price"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">  
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aucDate">
                            Auction Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="aucDate"
                            name="aucDate"
                            type="date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">  
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aucTime">
                            Auction Time
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="aucTime"
                            name="aucTime"
                            type="time"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            name="image"
                            type="text"
                            placeholder="Enter image URL"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                    <button type="submit" className="w-full bg-primary bg-color_button text-black py-2 px-4 rounded-md hover:bg-primary-dark mt-6">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;