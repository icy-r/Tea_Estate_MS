import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import menu from '../data-files/menu.js';
import { Routes, Route } from "react-router-dom";
import AddInvoice from './ManageInvoice.jsx';
import Invoice from './AddInvoice.jsx';
import UpdateInvoice from './UpdateInvoice.jsx';
import Order from './AddOrder.jsx';
import ManageOrders from './ManageOrders.jsx';
import Home from './home.jsx';
import UpdateOrder from './UpdateOrders.jsx';
import AddAuction from './AddAuction.jsx';
import StartAuctionPage from './StartAuction.jsx';
import ManageAuction from './ManageAuction.jsx';




const SalesHome = () => {
  return (
    <div >
      
      <AdminDashboardLayout menu={menu}>

      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SalesHome" element={<SalesHome />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/order" element={<Order />} />
            <Route path="/addinvoice" element={<AddInvoice />} />
            <Route path="/addinvoice/:id" element={<UpdateInvoice />} />
            <Route path="/manageorders" element={<ManageOrders />} />
            <Route path="/manageorders/:id" element={<UpdateOrder />} />
            <Route path= "/addAuction" element={<AddAuction />}/>
            <Route path= "/startAuction/" element={<StartAuctionPage />}/>
            <Route path= "/manageauctions" element={<ManageAuction />}/>

            
        </Routes>

        </AdminDashboardLayout>

    </div>
  );
};

export default SalesHome;
