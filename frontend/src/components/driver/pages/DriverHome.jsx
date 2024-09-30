import React from 'react';
import menuItems from '../data-files/menu.js';
import {Route, Routes} from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import ManageAssignedVehicle from "../component/manageAssignedVehicle.jsx";
import RepairRequests from '../component/RepairRequests.jsx';

import Home from './home.jsx';

const DriverHome = () => {
    return (
        <div>
            <AdminDashboardLayout menu={menuItems}>
          

                  <Routes>
                    <Route path ="/" element={<Home driverId ={"EMP11569968"}/>}/>
                    <Route path ="/manage-assigned-vehicle" element={<ManageAssignedVehicle driverId ={"EMP11569968"}/>}/>
                    <Route path ="/repair-requests" element={<RepairRequests/>}/>
                </Routes> 

            </AdminDashboardLayout>


                              
                  
                  

           




         
        </div>
    );
};

export default DriverHome;