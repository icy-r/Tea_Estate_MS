import React, { useEffect, useState } from "react";
import axios from "../../../../services/axios.js";
import { useParams, useNavigate } from "react-router-dom";

function CatalogUpdate() {
    const URL = "http://localhost:3001/api/products/";
    const [productDetails, setProductDetails] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
        productCategory: '',
        productImage: ''
    });
    const { id } = useParams();  // Getting the product ID from the URL
    const navigate = useNavigate();

    // Fetch the product details by ID
    const fetchHandler = async () => {
        try {
            const response = await axios.get(`${URL}${id}`);  // Fetch the specific product
            setProductDetails(response.data);  // Set the product's data
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchHandler();  // Fetch data when component mounts
        }
    }, [id]);

    const sendRequest = async () => {
        try {
            const response = await axios.put(`${URL}${id}`, {
                productName: String(productDetails.productName),
                productDescription: String(productDetails.productDescription),
                productPrice: Number(productDetails.productPrice),  // Ensuring the price is a number
                productQuantity: Number(productDetails.productQuantity),  // Ensuring the quantity is a number
                productCategory: String(productDetails.productCategory),
                productImage: String(productDetails.productImage)
            });
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", productDetails);
        sendRequest()
            .then(() => {
                navigate('/CatalogDetails');  // Navigate to CatalogDetails after successful update
            })
            .catch((error) => {
                console.error("Error during product update:", error);
            });
    };

    const handleChange = (e) => {
        setProductDetails((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Product</h1>
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
                <button type="submit" className="w-full bg-primary bg-color_button text-black py-2 px-4 rounded-md hover:bg-primary-dark mt-6">Update Product</button>
                </div>
            </form>
        </div>
    </div>
);
}

export default CatalogUpdate;
