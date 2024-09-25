import React from "react";
import {Route, Routes} from 'react-router-dom';
import SupplyHome from "./pages/SupplyHome.jsx";
import AddSupply from "./pages/AddSupply.jsx";
import ManageSupply from "./pages/ManageSupply.jsx";
import UpdateSupply from "./pages/UpdateSupply.jsx";
import AddSupplier from "./pages/AddSupplier.jsx";
import ManageSupplier from "./pages/ManageSupplier.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menuItems from "../data-files/menu.js";
import OrderSupply from "./pages/OrderSupply.jsx";
import ViewHistory from "./pages/ViewHistory.jsx";


const SupplyRoutes = () => {
    
    return (
        <AdminDashboardLayout menu ={menuItems}>    
        <Routes>
            <Route path="/" exact element={<SupplyHome />} />
            <Route path="/supply" exact element={<SupplyTypePieChart />} />
            <Route path="/add" element={<AddSupply />} />
            <Route path="/manage" element={<ManageSupply />} />
            <Route path="/addsupplier" element={<AddSupplier />} />
            <Route path="/managesupplier" element={<ManageSupplier />} />
            <Route path="/ordersupplies" element={<OrderSupply />} />
            <Route path="/viewhistory" element={<ViewHistory />} />
            

        </Routes>
        </AdminDashboardLayout>
    );
};

export default SupplyRoutes;