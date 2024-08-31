import React from 'react';
import Sidebar from '@components/dashboard/Sidebar.jsx';
import Header from '@components/dashboard/HeaderDashboard.jsx';
import Content from '@components/dashboard/Content.jsx';
import menuItems from './menuItems.js';

const TransportManagementDashboard = () => {

    return (
        <div className="flex h-screen">
            <div className="w-72 h-full sticky top-0 overflow-y-auto  overflow-x-hidden hidden md:block">
                <Sidebar menuItems={menuItems} />
            </div>
            
            <div className="flex flex-col w-full h-full overflow-y-auto">
                <div className="bg-white sticky top-0 z-10">
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                </div>
                
                <Content>
                    {/* Example repeated Headers */}
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />
                    <Header mainTitle="Route Management" subTitle="Adding New Route" />

              
                </Content>
            </div>
        </div>
    );
};

export default TransportManagementDashboard;
