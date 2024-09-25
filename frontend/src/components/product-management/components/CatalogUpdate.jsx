import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../services/axios';

const CatalogUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({
        quality: '',
        quantity: '',
        unitPrice: '',
        description: '',
        aucDate: '',
        aucTime: '',
        image: '',
    });

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/catalog/${id}`);
                setProduct(response.data);  // Populate product data
            } catch (error) {
                console.error("Error fetching product", error);
            }
            
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Inputs:',inputs);
        try {
            await axios.put(`http://localhost:3001/api/catalog/${id}`, inputs);
            alert('Product updated successfully.');
            navigate('admin/product/adminDashboard');
        } catch (error) {
            console.error('Error updating product', error);
            alert('Failed to update product.');
        }
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
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" 
                            value={product.quality} 
                            onChange={(e) => setProduct({...product, quality: e.target.value})} 
                        />
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
                            value={inputs.quantity}
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
                            value={inputs.unitPrice}
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
                            value={inputs.description}
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
                            value={inputs.aucDate}
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
                            value={inputs.aucTime}
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
                            value={inputs.image}
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

export default CatalogUpdate;
