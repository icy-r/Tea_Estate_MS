import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../components/addProduct.jsx";
import BuyerDetails from "../components/BuyerDetails.jsx";
import CatalogUpdate from "../components/CatalogUpdate.jsx";
import MarketPlace from "../components/marketPlace.jsx";
import AdminDashboard from "./adminDashboard.jsx" ;
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";  
import BuyerUpdate from "../components/BuyerUpdate.jsx";
import menu from "../data-files/menu.js";

const ProductRoutes = () => {
    return (
        
        <div>
        
        <AdminDashboardLayout menu={menu}>

        <Routes>

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="addProduct/" element={<AddProduct />} />
        <Route path="buyerDetails/" element={<BuyerDetails />} />
        <Route path="marketplace/" element={<MarketPlace />} />
        <Route path="/buyerDetails/:id" element={<BuyerUpdate />} />
        <Route path="/admin/product/adminDashboard/CatalogUpdate/:id" element={<CatalogUpdate />} />

        
        </Routes>
    
        </AdminDashboardLayout>  
        </div>
    );
    };

export default ProductRoutes;
