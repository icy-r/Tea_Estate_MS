import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/FieldHome.jsx";
import AddField from "./pages/AddField";
import ManageField from "./pages/ManageField";
import UpdateField from "./pages/UpdateField";
import AssignLabours from "./pages/AssignLabours.jsx";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout.jsx";
import menuItems from "./data-files/menuItems.js";
import ViewHarvest from "./pages/ViewHarvest.jsx";
import AddHarvest from "./pages/AddHarvest.jsx";
import CalculateOT from "./pages/CalculateOT.jsx";
import AddFertilizer from "./pages/AddFertilizer.jsx";
import ManageFertilizer from "./pages/ManageFertilizer.jsx";
import UpdateFertilizer from "./pages/UpdateFertilizer.jsx";

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
          <Route path="/calculate-ot" element={<CalculateOT />} />
          <Route path="/add-fertilizer" element={<AddFertilizer />} />
          <Route path="/manage-fertilizer" element={<ManageFertilizer />} />
          <Route path="/manage-fertilizer/:id" element={<UpdateFertilizer />} />
        </Routes>
      </AdminDashboardLayout>
    </>
  );
};

export default FieldRoutes;