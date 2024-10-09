import Header from '../dashboard/HeaderDashboard.jsx';
import Sidebar from '../dashboard/Sidebar.jsx';
import topMenuItemsNav from "../../constants/top-menu-items.js";
import Content from "../dashboard/Content.jsx";
import "../dashboard/dashboardStyle.css";
import { useState } from "react";

const AdminDashboardLayout = ({ children, menu }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = menu ? menu : null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header (Full Width) */}
      <div className="w-full sticky top-0 z-20 bg-white ">
        <Header
          mainTitle="Admin Dashboard"
          subTitle="Dashboard"
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Section with Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 h-full overflow-y-auto bg-gray-800 overflow-x-hidden no-scrollbar ">
            <Sidebar
              setopen={setIsSidebarOpen}
              topMenuItems={topMenuItemsNav}
              menuItems={menuItems}
            />
          </div>
        )}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-action border border-action px-4 py-1 mx-3 my-3 rounded hover:bg-action hover:text-white h-max"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto min-h-max">
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;