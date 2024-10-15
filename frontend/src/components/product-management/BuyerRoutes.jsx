import React, { useState } from "react"; // Import useState
import { Routes, Route } from "react-router-dom";
import AddBuyer from "../product-management/pages/AddBuyer.jsx";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout.jsx";
import UpdateBuyer from "../product-management/pages/UpdateBuyer.jsx";
import buyerMenuItems from "../product-management/data-files/buyerMenuItems.js";
import Profile from "../product-management/pages/profile.jsx";
import Catalog from "./pages/Catalog.jsx";
import WishList from "./pages/WishList.jsx";
import ManageBuyer from "./pages/ManageBuyer.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import OrderTracking from "./pages/OrderTracking.jsx";
import Quatation from "./pages/Quatation.jsx";

const BuyerRoutes = () => {
  // State for managing the wishlist
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
      <AdminDashboardLayout menu={buyerMenuItems}>
        <Routes>
          {/* Base Route for Buyer */}
          <Route path="addBuyer/" element={<AddBuyer />} />
          <Route path="manageBuyer/" element={<ManageBuyer />} />
          <Route path="updateBuyer" element={<UpdateBuyer buyerId ={"670b7934363b8e6bce2bf13d"} />} />
          <Route path="profile/" element={<Profile buyerId ={"670b7934363b8e6bce2bf13d"}/>} />
          <Route 
            path="catalog/" 
            element={<Catalog wishlist={wishlist} toggleWishlist={toggleWishlist} />} // Pass wishlist and toggle function
          />
          <Route 
            path="wishlist/" 
            element={<WishList wishlist={wishlist} toggleWishlist={toggleWishlist} />} // Pass wishlist and toggle function
          />
          <Route path="orderhistory/" element={<OrderHistory />} />
          <Route path="ordertracking/" element={<OrderTracking buyerId ={"670b7934363b8e6bce2bf13d"}/>} />
          <Route path="quatation/" element={<Quatation />} />
        </Routes>
      </AdminDashboardLayout>
    </div>
  );
};

export default BuyerRoutes;
