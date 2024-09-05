import { useState } from "react";
import FieldRoutes from "../components/field-management/FieldRoutes.jsx";
import TransportHome from "../components/transport-management/pages/TransportHome.jsx";
import RepairRoutes from "../components/repair-management/repair-routes.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Header from "../components/dashboard/HeaderDashboard.jsx";
import Content from "../components/dashboard/Content.jsx";
import menuItems from "./menuItems.js";
import Home from "../components/dashboard/pages/Home.jsx";

import "../App.css";
import Error404 from "./error404.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as authService from "../services/auth-service.js";
import ProtectedRoutes from "../Routes/ProtectedRoutes.jsx";
import AdminLogin from "./login/AdminLogin.jsx";

function App() {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/*<HeaderDashboard user={user} onAuthEvt={handleAuthEvt} onLogout={handleLogout}/>*/}
      <Routes>
        {/* Public Routes */}
        <Route
          path="auth/login"
          element={<AdminLogin handleAuthEvt={handleAuthEvt} />}
        />
        <Route path="/about" element={<div>About</div>} />

        {/* Protected Routes */}
        <Route
          path="/repair/*"
          element={
            <ProtectedRoutes user={user}>
              <RepairRoutes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/field/*"
          element={
            <ProtectedRoutes user={user}>
              <FieldRoutes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/transport/*"
          element={
            <ProtectedRoutes user={user}>
              <TransportHome />
            </ProtectedRoutes>
          }
        />

        {/* Catch-all route */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <div className="flex h-screen">
        {isSidebarOpen && (
          <div
            className={`w-72 h-full sticky top-0 overflow-y-auto overflow-x-hidden ease-in transition duration-700 md:block`}
          >
            <Sidebar menuItems={menuItems} />
          </div>
        )}

        <div className="flex flex-col w-full h-full overflow-y-auto">
          <div className="bg-white sticky top-0 z-10">
            <Header
              mainTitle="Route Management"
              subTitle="Adding New Route"
              toggleSidebar={toggleSidebar}
            />
          </div>

          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div>About</div>} />
              <Route path="/field/*" element={<FieldRoutes />} />
              <Route path="/repair/*" element={<RepairRoutes />} />
              <Route path="/transport/*" element={<TransportHome />} />
              <Route path="/*" element={<Error404 />} />
            </Routes>
          </Content>
        </div>
      </div>
    </>
  );
}

export default App;
