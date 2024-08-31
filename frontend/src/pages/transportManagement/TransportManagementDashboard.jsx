import React from 'react';
import Sidebar from '@components/dashboard/Sidebar.jsx';
import Header from '@components/dashboard/HeaderDashboard.jsx';
import Content from '@components/dashboard/Content.jsx';


const TransportManagementDashboard = () => {

    const menuItems = [
        { name: 'Home', link: '/home' },
        { 
            name: 'Vehicle management', 
            subItems: [
                { name: 'Add employee', link: '/add-vehicle' },
                { name: 'Manage vehicle', link: '/manage-vehicle' },
            ] 
        },
        { 
            name: 'Route management', 
            subItems: [
                { name: 'Add Route', link: '/add-route', active: true },
                { name: 'Manage Routes', link: '/manage-routes' },
            ] 
        },
        { 
            name: 'Transport management', 
            subItems: [
                { name: 'Schedule a routine', link: '/schedule-routine' },
                { name: 'Manage Routines', link: '/manage-routines' },
                { name: 'Generate Report', link: '/generate-report' },
            ] 
        },
        { 
            name: 'Distribution Management', 
            subItems: [
                { name: 'Manage Distributions', link: '/manage-distributions' },
                { name: 'Delivery Complains', link: '/delivery-complains' },
            ] 
        },
    ];

    return (
        <div className="flex h-full">
        <Sidebar menuItems={menuItems} />
        <div className="flex flex-col w-full">
            <Header mainTitle="Route Management" subTitle="Adding New Route" />
            <Content>
                

            </Content>
        </div>
    </div>
    );
};

export default TransportManagementDashboard;



