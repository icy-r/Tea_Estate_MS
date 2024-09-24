
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import menu from "../data-files/menu.js";
import CreateInventory from "../components/CreateInventory.jsx";
import { Routes, Route } from "react-router-dom";

const InventoryDashboard = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      {/* <Home /> */}
      <Routes>
        <Route path="/create-inventory" element={<CreateInventory />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default InventoryDashboard;