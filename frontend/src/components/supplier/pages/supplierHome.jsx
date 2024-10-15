import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import menuItems from '../data-files/menu.js';

import {Route, Routes} from 'react-router-dom';
import CallingSupplyList from "../components/ViewCalls.jsx";
import ViewOrders from "../components/viewOrders.jsx";
import Supplierhome from './home.jsx';


const SupplierHome = () => {
    return (
        <AdminDashboardLayout menu={menuItems}>

            <Routes>
                <Route path="/" element={<Supplierhome supplierid="ID005"/>} />
                <Route path="/supplycalls" element={ <CallingSupplyList supplierid="ID005"/>  }/>
                <Route path="/view-orders" element={<ViewOrders supplierid="ID005"/>}/>
            </Routes>

        </AdminDashboardLayout>
    );
};
export default SupplierHome;