import React from "react";
import { Routes, Route } from "react-router-dom";
import AddBuyer from "../product-management/pages/AddBuyer.jsx";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout.jsx";
import UpdateBuyer from "../product-management/pages/UpdateBuyer.jsx";
import buyerMenuItems from "../product-management/data-files/buyerMenuItems.js";
import BuyerDashboard from "../product-management/pages/BuyerDashboard.jsx";
import Profile from "../product-management/pages/profile.jsx";

const BuyerRoutes = () => {
    return (
        
        <div>
        
        <AdminDashboardLayout menu={buyerMenuItems}>

        <Routes>
        <Route path="buyerDashboard" element={<BuyerDashboard/>} />
        <Route path="addBuyer/" element={<AddBuyer />} />
        <Route path="manageBuyer/:id" element={<UpdateBuyer />} />
        <Route path="profile" element={<Profile />} />
        
        

        </Routes>
    
        </AdminDashboardLayout>  
        </div>
    );
    };

export default BuyerRoutes;
