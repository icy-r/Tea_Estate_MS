import React from 'react';
import ActionButtonColor from "@divs/ActionButtonColor.jsx";

const products = [
    { 
      id: 1, 
      name: 'Premium Green Tea', 
      quality: 'High',
      quantity: '50kg',
      startingPrice: '$15.00', 
      description: 'A high-quality green tea with a fresh, clean taste.', 
      aucDate: '2024-09-01', 
      aucTime: '10:00 AM', 
      image: 'https://via.placeholder.com/150' 
    },
    { 
      id: 2, 
      name: 'Black Tea Blend', 
      quality: 'Medium',
      quantity: '100kg',
      startingPrice: '$12.00', 
      description: 'A robust blend of black teas with a bold flavor.', 
      aucDate: '2024-09-03', 
      aucTime: '2:00 PM', 
      image: 'https://via.placeholder.com/150' 
    },
    { 
      id: 3, 
      name: 'Herbal Tea Mix', 
      quality: 'Premium',
      quantity: '30kg',
      startingPrice: '$18.00', 
      description: 'An aromatic mix of herbal teas for a soothing experience.', 
      aucDate: '2024-09-05', 
      aucTime: '11:00 AM', 
      image: 'https://via.placeholder.com/150' 
    },
  ];
  

  const MarketPlace = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Tea Marketplace</h1>
          <p className="text-lg text-gray-600 mt-2">Discover the finest raw teas from around the world.</p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-gray-600 mt-2"><strong>Quality:</strong> {product.quality}</p>
                <p className="text-gray-600 mt-2"><strong>Quantity:</strong> {product.quantity}</p>
                <p className="text-gray-600 mt-2"><strong>Starting Price:</strong> {product.startingPrice}</p>
                <p className="text-gray-600 mt-2"><strong>Auction Date:</strong> {product.aucDate}</p>
                <p className="text-gray-600 mt-2"><strong>Auction Time:</strong> {product.aucTime}</p>
                <div className="flex items-center justify-center mt-6">
                    <ActionButtonColor text="Join" href="Join" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default MarketPlace;
  


