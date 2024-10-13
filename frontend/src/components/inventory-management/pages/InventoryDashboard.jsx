
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import menu from "../data-files/menu.js";
import CreateInventory from "../components/CreateInventory.jsx";
import { Routes, Route } from "react-router-dom";
import ReadInventory from "../components/ReadInventory.jsx";
import UpdateInventory from "../components/UpdateInventory.jsx"
import DeleteInventory from "../components/DeleteInventory.jsx";
import GenerateReports from "./GenerateReports.jsx";
import InventoryHome from "./InventoryHome.jsx";
import GenerateGraphs from "./GenerateGraphs.jsx";
import CreateTest from "../components/CreateTest.jsx";

const InventoryDashboard = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      {/* <Home /> */}
      <Routes>
        <Route path="/create-inventory" element={<CreateInventory />} />
        <Route path="/read-inventory" element={<ReadInventory />} />
        <Route path="/update-inventory" element={<UpdateInventory />} />
        <Route path="/delete-inventory" element={<DeleteInventory />} />
        <Route path="/generate-reports" element={<GenerateReports />} />
        <Route path="/" element={<InventoryHome />} />
        <Route path="/generate-graphs" element={<GenerateGraphs />} />
        <Route path="/create-test" element={<CreateTest />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default InventoryDashboard;