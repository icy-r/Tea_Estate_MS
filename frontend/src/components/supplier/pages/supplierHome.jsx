import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import menuItems from '../data-files/menu.js';

import {Route, Routes} from 'react-router-dom';
import CallingSupplyList from "../components/ViewCalls.jsx";


const SupplierHome = () => {
    return (
        <AdminDashboardLayout menu={menuItems}>

            <Routes>
                <Route path="/" element={<h1>SupplierHomepage</h1>} />
                <Route path="/supplycalls" element={ <CallingSupplyList supplierid="ID005"/>  }/>
                {/* <Route path="/vieworder" element={}/> */}
            </Routes>

        </AdminDashboardLayout>
    );
};
export default SupplierHome;