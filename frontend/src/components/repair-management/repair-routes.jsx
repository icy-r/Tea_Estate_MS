import Home from "./pages/home.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menu from "./data-files/menu.js";
import { Routes, Route } from "react-router-dom";
import ViewReports from "./pages/ViewReports.jsx";
import ViewMaintenance from "./pages/ViewMaintenance.jsx";
import NewMaintenance from "./pages/NewMaintenance.jsx";
import NewAsset from "./pages/NewAsset.jsx";
import HomeGraphs from "./pages/HomeGraphs.jsx";
import AssignedTasks from "./pages/AssignedTasks.jsx";
import ReqMaintenance from "./pages/ReqMaintenance.jsx";

const RepairRoutes = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      <Routes>
        <Route path="/" element={<HomeGraphs />} />
        <Route path="/machine" element={<Home />} />
        <Route path="/viewreports" element={<ViewReports />} />
        <Route path="/maintenance" element={<ViewMaintenance />} />
        <Route path="/newmaintenance" element={<NewMaintenance />} />
        <Route path="/newasset" element={<NewAsset />} />
        <Route path="/assignedtasks" element={<AssignedTasks />} />
        <Route path="/reqmaintenance" element={<ReqMaintenance />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default RepairRoutes;