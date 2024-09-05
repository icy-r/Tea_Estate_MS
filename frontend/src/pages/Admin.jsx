import {useState} from 'react';
import FieldRoutes from "../components/field-management/FieldRoutes.jsx";
import TransportHome from '../components/transport-management/pages/TransportHome.jsx';
import RepairRoutes from "../components/repair-management/repair-routes.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Header from '../components/dashboard/HeaderDashboard.jsx';
import Content from '../components/dashboard/Content.jsx';
import menuItems from './menuItems.js';
import Home from '../components/dashboard/pages/Home.jsx';

import '../App.css';
import Error404 from "./error404.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="flex h-screen">
                {isSidebarOpen &&
                    <div
                        className={`w-72 h-full sticky top-0 overflow-y-auto overflow-x-hidden ease-in transition duration-700 md:block`}>
                        <Sidebar menuItems={menuItems}/>
                    </div>}

                <div className="flex flex-col w-full h-full overflow-y-auto">
                    <div className="bg-white sticky top-0 z-10">
                        <Header mainTitle="Route Management" subTitle="Adding New Route" toggleSidebar={toggleSidebar}/>
                    </div>

                    <Content>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<div>About</div>}/>
                            <Route path="/field/*" element={<FieldRoutes/>}/>
                            <Route path="/repair/*" element={<RepairRoutes/>}/>
                            <Route path="/transport/*" element={<TransportHome/>}/>
                            <Route path="/*" element={<Error404/>}/>
                        </Routes>
                    </Content>
                </div>
            </div>
        </>
    );
}

export default App;