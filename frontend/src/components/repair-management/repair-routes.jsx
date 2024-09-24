import Home from "./pages/home.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menu from "./data-files/menu.js";
import { Routes, Route } from "react-router-dom";

const RepairRoutes = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      {/* <Home /> */}
      <Routes>
        <Route path="/machine" element={<Home />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default RepairRoutes;