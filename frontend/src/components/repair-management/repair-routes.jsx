import { Routes, Route } from "react-router-dom";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import menu from "./data-files/menu.js";
import HomeGraphs from "./pages/HomeGraphs.jsx";
import ViewReports from "./pages/ViewMaintenanceRequests.jsx";
import ViewMaintenance from "./pages/ViewMaintenance.jsx";
import NewMaintenance from "./pages/NewMaintenance.jsx";
import NewAsset from "./pages/NewAsset.jsx";
import ViewAssets from "./pages/ViewAssets.jsx";
import AssignedTasks from "./pages/AssignedTasks.jsx";
import ReqMaintenance from "./pages/ReqMaintenance.jsx";
import TaskPriorityManagement from "./pages/TaskPriorityManagement.jsx";
import MaintenanceScheduler from "./pages/MaintenanceScheduler.jsx";
import AssetDetails from "./pages/AssetDetails.jsx";
import ViewMaintenanceDetails from "./pages/ViewMaintenanceDetails.jsx";
import EditAsset from "./pages/EditAsset.jsx";
import EditMaintenanceRequest from "./pages/EditMaintenanceRequest.jsx";
import EditMaintenance from "./pages/EditMaintenance.jsx";
const RepairRoutes = () => {
  return (
    <AdminDashboardLayout menu={menu}>
      <Routes>
        <Route path="/" element={<HomeGraphs />} />
        <Route path="viewreports" element={<ViewReports />} />
        <Route path="maintenance" element={<ViewMaintenance />} />
        <Route path="newmaintenance" element={<NewMaintenance />} />
        <Route path="newasset" element={<NewAsset />} />
        <Route path="viewassets" element={<ViewAssets />} />
        <Route path="assignedtasks" element={<AssignedTasks />} />
        <Route path="reqmaintenance" element={<ReqMaintenance />} />
        <Route path="taskpriority" element={<TaskPriorityManagement />} />
        <Route path="scheduler" element={<MaintenanceScheduler />} />
        <Route path="assets/edit/:id" element={<EditAsset />} />
        <Route path="assetDetails/:id" element={<AssetDetails />} />
        <Route path="editmaintenance/:id" element={<EditMaintenance />} />
        <Route
          path="editmaintenancerequest/:id"
          element={<EditMaintenanceRequest />}
        />
        <Route
          path="editmaintenancerequest/:id"
          element={<EditMaintenanceRequest />}
        />
        <Route
          path="viewmaintenance/:id"
          element={<ViewMaintenanceDetails />}
        />
      </Routes>
    </AdminDashboardLayout>
  );
};

export default RepairRoutes;
