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

function MarketPlace({ isAdmin }) {  // Accepting isAdmin as a prop
    const [catalog, setCatalog] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchHandler(setCatalog);
    }, []);

    const handleEdit = (id) => {
        // Navigate to the CatalogUpdate page with the product ID
        navigate(`/catalog-update/${id}`);
    };

    const handleDelete = async (id) => {
        // Handle delete logic
        try {
            await axios.delete(`${URL}/${id}`);
            setCatalog(catalog.filter((product) => product._id !== id)); // Update state to remove deleted product
            alert("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            alert("Error deleting product.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {isAdmin ? "Admin Market Place" : "Market Place"}
            </h1>
            {catalog.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {catalog.map((product) => (
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
                      <div className="flex justify-between">
                        <button 
                          className="bg-yellow-500 text-white py-2 px-4 rounded-md"
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
