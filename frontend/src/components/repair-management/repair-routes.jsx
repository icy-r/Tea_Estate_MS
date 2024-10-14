import { Routes, Route } from "react-router-dom";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menu from "./data-files/menu.js";
import HomeGraphs from "./pages/HomeGraphs.jsx";
import ViewReports from "./pages/ViewReports.jsx";
import ViewMaintenance from "./pages/ViewMaintenance.jsx";
import NewMaintenance from "./pages/NewMaintenance.jsx";
import NewAsset from "./pages/NewAsset.jsx";
import AssignedTasks from "./pages/AssignedTasks.jsx";
import ReqMaintenance from "./pages/ReqMaintenance.jsx";
import TaskPriorityManagement from "./pages/TaskPriorityManagement.jsx";
import TechnicianManagement from "./pages/TechnicianManagement.jsx";
import PreventiveMaintenanceScheduler from "./pages/PreventiveMaintenanceScheduler.jsx";
import AssetPerformance from "./pages/AssetPerformance.jsx";

const RepairRoutes = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      <Routes>
        <Route path="/" element={<HomeGraphs />} />
        <Route path="/viewreports" element={<ViewReports />} />
        <Route path="/maintenance" element={<ViewMaintenance />} />
        <Route path="/newmaintenance" element={<NewMaintenance />} />
        <Route path="/newasset" element={<NewAsset />} />
        <Route path="/assignedtasks" element={<AssignedTasks />} />
        <Route path="/reqmaintenance" element={<ReqMaintenance />} />
        <Route path="/taskpriority" element={<TaskPriorityManagement />} />
        <Route path="/technicians" element={<TechnicianManagement />} />
        <Route
          path="/preventive-maintenance"
          element={<PreventiveMaintenanceScheduler />}
        />
        <Route path="/asset-performance" element={<AssetPerformance />} />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default RepairRoutes;
