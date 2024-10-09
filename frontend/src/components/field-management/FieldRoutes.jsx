import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/FieldHome.jsx";
import AddField from "./pages/AddField";
import ManageField from "./pages/ManageField";
import UpdateField from "./pages/UpdateField";
import AssignLabours from "./pages/AssignLabours.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import ViewHarvest from "./pages/ViewHarvest.jsx";
import AddHarvest from "./pages/AddHarvest.jsx";
import menuItems from './data-files/menuItems.js';

const FieldRoutes = () => {
  return (
    <>
      <AdminDashboardLayout menu={menuItems}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddField />} />
          <Route path="/manage" element={<ManageField />} />
          <Route path="/manage/:id" element={<UpdateField />} />
          <Route path="/labours" element={<AssignLabours />} />
          <Route path="/view-harvest" element={<ViewHarvest />} />
          <Route path="/add-harvest" element={<AddHarvest />} />
        </Routes>
      </AdminDashboardLayout>
    </>
  );
};

export default FieldRoutes;