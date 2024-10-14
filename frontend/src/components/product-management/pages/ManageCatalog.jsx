import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Imported first
import axios from '../../../services/axios.js';

const ManageCatalog = () => {
    const [products, setProducts] = useState([]);
    const navigateTo = useNavigate();
    
    // Fetch product details from the API
    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/catalog/"); // Ensure the URL is correct
            console.log(response.data);
            setProducts(response.data);   
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    };
    
    useEffect(() => {
        fetchDetails();  // Fetches product details when the component mounts
    }, []);  // No dependencies, runs only on mount

    // Handle product update
    const handleUpdate = (product) => {
        console.log("Product ID:", product._id);  
        navigateTo(`/admin/product/manageCatalog/${product._id}`, { state: { product } });
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/catalog/${id}`); 
            alert("Product deleted successfully");
            
            // Use functional form of setProducts to avoid stale state issues
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Product Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-teal-500 text-white">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Quality</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th className="py-2 px-4 text-left">Unit Price</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-left">Auction Date</th>
                            <th className="py-2 px-4 text-left">Auction Time</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b border-gray-200">
                                <td className="py-2 px-4 text-left">{product.pid}</td>
                                <td className="py-2 px-4 text-left">{product.quality}</td>
                                <td className="py-2 px-4 text-left">{product.quantity} Kg</td>
                                <td className="py-2 px-4 text-left">Rs.{product.unitPrice}</td>
                                <td className="py-2 px-4 text-left">{product.description}</td>
                                <td className="py-2 px-4 text-left">{product.aucDate}</td>
                                <td className="py-2 px-4 text-left">{product.aucTime}</td>
                                <td className="py-2 px-4 text-left">
                                    <button 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                                        onClick={() => handleUpdate(product)}>
                                        Update
                                    </button>
                                    <button 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded" 
                                        onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCatalog;
