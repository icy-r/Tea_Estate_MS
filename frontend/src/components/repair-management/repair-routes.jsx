import Home from "./pages/home.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menu from "./data-files/menu.js";
import { Routes, Route } from "react-router-dom";

const RepairRoutes = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default RepairRoutes;