import { useState } from 'react';
import Menubar from "../components/menubar/Menubar.jsx";
import Home from "../components/repair-management/pages/home.jsx";
import FieldHome from "../components/field-management/pages/FieldHome.jsx";
import { Route, Routes } from "react-router-dom";
import RepairRoutes from "../components/repair-management/repair-routes.jsx";
import Header from "../components/navbar/Header.jsx";
import MarketPlace from './productManagement/Products/Buyer/marketPlace.jsx';
import CatalogUpdate from './productManagement/Products/Admin/CatalogUpdate.jsx';
import AddProduct from './productManagement/Products/Admin/AddProduct.jsx';
import AdminDashboard from './productManagement/Products/Admin/adminDashboard.jsx';

import '../App.css';

function App() {
    const [open, setOpen] = useState(false);
    const isAdmin = true;

    

    return (
        <>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />

            
            <AdminDashboard />
            <MarketPlace isAdmin={isAdmin} />
        
            {/* Routes to handle navigation */}
            <Routes>
                
                <Route path="/marketplace" element={<MarketPlace/>} />
                <Route path="/catalog-update" element={<CatalogUpdate />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Routes>
        </>
    );
}

export default App;
