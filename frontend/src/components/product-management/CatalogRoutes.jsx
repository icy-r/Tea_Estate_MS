import React from "react";
import { Routes, Route } from "react-router-dom";
import ManageBuyer from "./pages/ManageBuyer.jsx";
import UpdateCatalog from "./pages/UpdateCatalog.jsx";
import AddCatalog from "./pages/AddCatalog.jsx";
import ManageCatalog from "./pages/ManageCatalog.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout.jsx";
import catalogMenuItems from "./data-files/catalogMenuItems.js";
import Catalog from "./pages/Catalog.jsx";

const CatalogtRoutes = () => {
    return (
        
        <div>
        
        <AdminDashboardLayout menu={catalogMenuItems}>

        <Routes>

        // product-management routes here

        <Route path="managerDashboard" element={<ManagerDashboard />} />
        <Route path="addCatalog/" element={<AddCatalog />} />
        <Route path="manageCatalog/" element={<ManageCatalog />} />
        <Route path="manageCatalog/:id" element={<UpdateCatalog />} />
        <Route path="catalog/" element={<Catalog />} />
        
        // Buyer routes here
        
        <Route path="manageBuyer/" element={<ManageBuyer />} />
        </Routes>
    
        </AdminDashboardLayout>  
        </div>
    );
    };

export default CatalogtRoutes;
