// MainComponent.js
import React, { useState } from "react";
import Catalog from "../pages/Catalog.jsx";
import Wishlist from "../pages/WishList.jsx";

function MainComponent() {
    const [wishlist, setWishlist] = useState([]);

    // Function to handle adding/removing products from wishlist
    const toggleWishlist = (product) => {
        if (wishlist.some((item) => item._id === product._id)) {
            setWishlist(wishlist.filter((item) => item._id !== product._id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    return (
        <div>
            <Catalog wishlist={wishlist} toggleWishlist={toggleWishlist} />
            <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} /> {/* Pass the toggleWishlist function */}
        </div>
    );
}

export default MainComponent;
