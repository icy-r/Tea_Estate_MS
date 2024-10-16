import React, { useState, useEffect } from "react";
import axios from "../../../services/axios.js";
import Tea from '@assets/product/tea.png';
import bop from '@assets/product/BOP.jpg';
import bp from '@assets/product/BP.jpg';
import bpf from '@assets/product/BPF.jpg';
import dust from '@assets/product/dust.jpg';
import fop from '@assets/product/FOP.jpg';
import golden from '@assets/product/GOLDEN.jpg';
import op from '@assets/product/OP.jpg';
import p from '@assets/product/P.jpeg';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Ensure you have @mui/icons-material installed

const URL = "http://localhost:3001/api/catalog/";

function Catalog() {
    const [catalog, setCatalog] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);  // Wishlist state

    // Fetch catalog data on component mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await axios.get(URL);
                setCatalog(response.data);
            } catch (error) {
                console.error("Error fetching catalog", error);
            }
        };
        fetchCatalog();
    }, []);

    // Filter catalog based on the search query
    const filteredCatalog = catalog.filter(product =>
        product.quality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to determine product image
    const image = (quality) => {
        switch (quality) {
            case "Broken Orange Pekoe (BOP)": return bop;
            case "Broken Pekoe (BP)": return bp;
            case "Broken Pekoe Fanning (BPF)": return bpf;
            case "Dust Fannings (D)": return dust; 
            case "Flowery Orange Pekoe (FOP)": return fop;
            case "Golden Tip": return golden;
            case "Orange Pekoe (OP)": return op;
            case "Pekoe (P)": return p;
            default: return p;
        }
    };

    // Function to handle adding/removing products from wishlist
    const toggleWishlist = (product) => {
        if (wishlist.some((item) => item._id === product._id)) {
            setWishlist(wishlist.filter((item) => item._id !== product._id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    // Check if a product is in the wishlist
    const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                   Bio Tea Market Place
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
                            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4 relative">
                                {/* Product Image */}
                                <div className="mt-2 mb-4">
                                    <img
                                        src={image(product.quality)}
                                        alt={product._id}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    {/* Wishlist Icon */}
                                    <button
                                        className={`absolute top-2 right-2 p-2 rounded-full ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-500'}`}
                                        onClick={() => toggleWishlist(product)}
                                    >
                                        <FavoriteIcon />
                                    </button>
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

                                {/* Auction Button */}
                                <div className="flex justify-center items-center">
                                <a href="https://us05web.zoom.us/j/89246140524?pwd=55Vb5cCr6EJtarp25c0xn7YrVzzauf.1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-color_button text-white py-2 px-4 rounded-md"
                                >
                                Join Auction
                                </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found</p>
                )}
            </div>

            {/* Wishlist Section */}
            <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Your Wishlist</h2>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
                                {/* Wishlist Product Image */}
                                <div className="mt-2 mb-4">
                                    <img
                                        src={image(product.quality)}
                                        alt={product._id}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>

                                {/* Wishlist Product Quality */}
                                <div className="mb-2">
                                    <span className="ml-2 text-green-600">{product.quality}</span>
                                </div>

                                {/* Wishlist Product Price and Quantity */}
                                <div>
                                    <span className="text-blue-600">Unit Price: Rs. {product.unitPrice}/=</span>
                                </div>
                                <div className="text-blue-500 mb-4">Available: {product.quantity} KG</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your wishlist is empty</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;
