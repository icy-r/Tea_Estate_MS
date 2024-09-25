import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import BuyerDetails from "../components/BuyerDetails.jsx";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";  
import BuyerUpdate from "../components/BuyerUpdate.jsx";
import buyermenuItems from "../data-files/buyer-menu.js";
import MarketPlace from "../components/marketPlace.jsx";
import BuyerDashboard from "./buyerDashboard.jsx";

const BuyerRoutes = () => {
    return (
        
        <div>
        
        <AdminDashboardLayout menu={buyermenuItems}>

        <Routes>
        <Route path="buyerDashboard" element={<BuyerDashboard />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="buyerDetails/" element={<BuyerDetails />} />
        <Route path="marketplace/" element={<MarketPlace />} />
        <Route path="/buyerDetails/:id" element={<BuyerUpdate />} />
        

        </Routes>
    
        </AdminDashboardLayout>  
        </div>
    );
    };

export default BuyerRoutes;
