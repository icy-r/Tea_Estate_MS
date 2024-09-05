import React from 'react';
import {useState} from 'react';
import Header from '../dashboard/HeaderDashboard.jsx';
import Sidebar from "../dashboard/Sidebar.jsx";
import menuItems from '../../pages/menuItems.js';

const AdminDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
            <div className='sticky top-0 z-10'>
                 <Header mainTitle="Admin Dashboard" subTitle="Dashboard"  toggleSidebar={toggleSidebar} />
            </div>

          
            {isSidebarOpen &&
                    <div
                        className={`w-72 h-screen sticky top-0 overflow-y-auto overflow-x-hidden ease-in transition duration-700 md:block`}>
                        <Sidebar menuItems={menuItems}/>
                    </div>}
        </div>
    );
};

export default AdminDashboardLayout;