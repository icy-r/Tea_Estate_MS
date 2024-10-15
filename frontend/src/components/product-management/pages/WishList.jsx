// WishList.jsx
import React from "react";
import bop from '@assets/product/BOP.jpg';
import bp from '@assets/product/BP.jpg';
import bpf from '@assets/product/BPF.jpg';
import dust from '@assets/product/dust.jpg';
import fop from '@assets/product/FOP.jpg';
import golden from '@assets/product/GOLDEN.jpg';
import op from '@assets/product/OP.jpg';
import p from '@assets/product/P.jpeg';

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
        default: return p; // Fallback image
    }
};

function WishList({ wishlist = [], toggleWishlist }) { // Accept toggleWishlist as prop
    return (
        <div>
            <h2 className="text-xl font-bold my-10 text-gray-800 flex justify-center">My Wishlist</h2>
            {wishlist.length > 0 ? ( // Safe to check length
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
                            {/* Render wishlist item details */}
                            <div className="mt-2 mb-4">
                                    <img
                                        src={image(product.quality)}
                                        alt={product.quality}
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

                                {/* Include additional product details here */}
                                <div className="flex justify-center mt-2">
                                    <button
                                        onClick={() => toggleWishlist(product)} // Toggle button to remove from wishlist
                                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-700 transition duration-200"
                                    >
                                    Remove from Wishlist
                                    </button>
                                </div>
                            </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Your wishlist is empty</p>
            )}
        </div>
    );
}

export default WishList;
