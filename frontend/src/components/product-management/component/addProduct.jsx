import React, { useState, useEffect } from 'react'; // Correct import
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios';

const AddProduct = () => {  
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        pid: "",
        quality: "",   
        quantity: "",
        unitPrice: "",
        description: "",
        aucDate: "",
        aucTime: "",
    });

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/catalog/");
                console.log("API Response:", response.data);
            } catch (error) {
                console.error("API Error:", error);
            }
        };
        fetchHandler();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (inputs.id) {
                const response = await axios.put(`http://localhost:3001/api/catalog/${inputs.id}`, {
                    pid: String(inputs.pid),
                    quality: String(inputs.quality),
                    quantity: String(inputs.quantity),
                    unitPrice: String(inputs.unitPrice),
                    description: String(inputs.description),
                    aucDate: String(inputs.aucDate),
                    aucTime: String(inputs.aucTime),
                });
                console.log("Catalog Updated:", response.data);
            } else {
                const response = await axios.post("http://localhost:3001/api/catalog/", {
                    pid: String(inputs.pid),
                    quality: String(inputs.quality),
                    quantity: String(inputs.quantity),
                    unitPrice: String(inputs.unitPrice),
                    description: String(inputs.description),
                    aucDate: String(inputs.aucDate),
                    aucTime: String(inputs.aucTime),
                });
                console.log("Product Added:", response.data);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pid">
                            Product ID 
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="pid"
                            name="pid"
                            value={inputs.pid}
                            type="text"
                            placeholder="Enter product ID"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quality">
                            Quality
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quality"
                            name="quality"
                            value={inputs.quality}
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
                            value={inputs.quantity}
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
                            value={inputs.unitPrice}
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
                            value={inputs.description}
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
                            value={inputs.aucDate}
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
                            value={inputs.aucTime}
                            type="time"
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
