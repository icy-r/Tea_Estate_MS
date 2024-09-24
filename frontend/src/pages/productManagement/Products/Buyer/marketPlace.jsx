import React from "react";
import axios from '../../../../services/axios.js';
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3001/api/catalog/";

const fetchHandler = async (setCatalog) => {
    try {
        const response = await axios.get(URL);
        setCatalog(response.data);
    } catch (error) {
        console.error(error);
    }
}

function MarketPlace({ isAdmin }) { 
    const [catalog, setCatalog] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchHandler(setCatalog);
    }, []);

    const handleEdit = (id) => {
        navigate(`/catalog-update/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setCatalog(catalog.filter((product) => product._id !== id));
            alert("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            alert("Error deleting product.");
        }
    };

    // Filtered catalog based on the search query
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
                
                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                {filteredCatalog.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCatalog.map((product) => (
                            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
                                <div className="mt-2 mb-4">
                                    <img
                                        src={product.image || '/path-to-default-image.jpg'}
                                        alt={product._id}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-red-500 font-semibold">Starts in {product.aucTime}</span>
                                </div>
                                <div className="mb-4">
                                    <span className="ml-2 text-green-600">{product.quality}</span>
                                </div>
                                <div>
                                    <span className="text-blue-600">Unit Price : Rs.{product.unitPrice}/=</span>
                                </div>
                                <div className="text-blue-500 mb-4">Available {product.quantity}KG</div>
                                <div className="text-gray-600 mb-4">
                                    {product.description}
                                </div>
                                {isAdmin ? (
                                    <div className="flex ml-10">
                                        <button 
                                            className="bg-color_extra text-white m-2 py-2 px-6 rounded-md"
                                            onClick={() => handleEdit(product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white m-2 py-2 px-4 rounded-md"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <button className="bg-color_button text-white py-2 px-4 rounded-md w-full">
                                        AUCTION
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No products found</p>
                )}
            </div>
        </div>
    );
}

export default MarketPlace;
