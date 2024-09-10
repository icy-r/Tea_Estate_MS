import React, {useState} from 'react';
import Header from '../dashboard/HeaderDashboard.jsx';
import Sidebar from '../dashboard/Sidebar.jsx';
import menuItems from '../../pages/menuItems.js';
import topMenuItemsNav from '../../pages/topMenuItems.js';
import Content from '../dashboard/Content.jsx';

import '../dashboard/dashboardStyle.css';

const AdminDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header (Full Width) */}
            <div className="w-full sticky top-0 z-20 bg-white ">
                <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
            </div>

            {/* Main Section with Sidebar and Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <div className="w-64 h-full overflow-y-auto bg-gray-800 overflow-x-hidden no-scrollbar ">
                        <Sidebar topMenuItems={topMenuItemsNav} menuItems={menuItems}/>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <Content>
                        {/* Repeated content for demonstration */}
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                        <Header mainTitle="Admin Dashboard" subTitle="Dashboard" toggleSidebar={toggleSidebar}/>
                    </Content>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;