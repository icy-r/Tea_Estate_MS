import React, { useState, useEffect } from "react";
import axios from "../../../services/axios.js";
import { useNavigate } from "react-router-dom";
import Tea from '@assets/product/tea.png';

const URL = "http://localhost:3001/api/catalog/";

function MarketPlace({ isAdmin }) {
    const [catalog, setCatalog] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Fetch catalog data on component mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await axios.get(URL);
                setCatalog(response.data);
                console.log(response.data);  // Debugging purpose
            } catch (error) {
                console.error("Error fetching catalog", error);
            }
        };
        fetchCatalog();
    }, []);

    // Handle editing a product
    const handleEdit = (id) => {
        console.log("Editing product with ID:", id); 
        navigate(`CatalogUpdate/${id}`);
    };

    // Handle deleting a product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}${id}`);
            setCatalog(catalog.filter((product) => product._id !== id));
            alert("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product", error);
            alert("Failed to delete product.");
        }
    };

    // Filter catalog based on the search query
    const filteredCatalog = catalog.filter(product =>
        product.quality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {isAdmin ? "Admin Market Place" : "Market Place"}
                </h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                {/* Product Listings */}
                {filteredCatalog.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCatalog.map((product) => (
                            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
                                {/* Product Image */}
                                <div className="mt-2 mb-4">
                                    <img
                                        src={Tea}
                                        alt={product._id}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>

                                {/* Auction Time */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-red-500 font-semibold">Starts in {product.aucTime}</span>
                                </div>

                                {/* Product Quality */}
                                <div className="mb-2">
                                    <span className="ml-2 text-green-600">{product.quality}</span>
                                </div>

                                {/* Product Price and Quantity */}
                                <div>
                                    <span className="text-blue-600">Unit Price: Rs. {product.unitPrice}/=</span>
                                </div>
                                <div className="text-blue-500 mb-4">Available: {product.quantity} KG</div>

                                {/* Product Description */}
                                <div className="text-gray-600 mb-4">
                                    {product.description}
                                </div>

                                {/* Admin Actions or Auction Button */}
                                {isAdmin ? (
                                    <div className="flex justify-center space-x-4">
                                        <button 
                                            className="bg-color_extra text-white py-2 px-6 rounded-md"
                                            onClick={() => handleEdit(product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white py-2 px-4 rounded-md"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <button className="bg-color_button text-white py-2 px-4 rounded-md w-full">
                                        Join Auction
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found</p>
                )}
            </div>
        </div>
    );
}

export default MarketPlace;
