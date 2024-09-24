
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import menu from "../data-files/menu.js";
import CreateInventory from "../components/CreateInventory.jsx";
import { Routes, Route } from "react-router-dom";
import ReadInventory from "../components/ReadInventory.jsx";
import UpdateInventory from "../components/UpdateInventory.jsx"
import DeleteInventory from "../components/DeleteInventory.jsx";

const InventoryDashboard = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      {/* <Home /> */}
      <Routes>
        <Route path="/create-inventory" element={<CreateInventory />} />
        <Route path="/read-inventory" element={<ReadInventory />} />
        <Route path="/update-inventory" element={<UpdateInventory />} />
        <Route path="/delete-inventory" element={<DeleteInventory />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default InventoryDashboard;