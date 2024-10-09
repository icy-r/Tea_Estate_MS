import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import updatecatalog from "../services/axios-update-catalog.js";

const UpdateCatalog = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const product = location.state.product; // Get product details from location state

    const [productData, setProductData] = useState({
        _id: product._id, // MongoDB-generated ID (read-only)
        pid: product.pid,
        quality: product.quality,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        description: product.description,
        aucDate: product.aucDate,
        aucTime: product.aucTime
    });

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    // Submit form data to update product
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await updatecatalog(productData);
            navigateTo('/admin/product/ManageCatalog'); 
        } catch (error) {
            console.error("Error updating product:", error);
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
                            value={productData.pid}
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
                            value={productData.quality}
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
                            value={productData.quantity}
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
                            value={productData.unitPrice}
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
                            value={productData.description}
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
                            value={productData.aucDate}
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
                            value={productData.aucTime}
                            type="time"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-primary bg-color_button text-black py-2 px-4 rounded-md hover:bg-primary-dark mt-6">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCatalog;
