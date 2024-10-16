import React from 'react';
import menuItems from '../data-files/menu.js';
import {Route, Routes} from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import ManageAssignedVehicle from "../component/manageAssignedVehicle.jsx";
import RepairRequests from '../component/RepairRequests.jsx';
import ViewTasks from '../component/ViewDailyTasks.jsx';

import Home from './home.jsx';

const DriverHome2 = () => {

    




    return (
        <div>
          
            <AdminDashboardLayout menu={menuItems}>
          

                <Routes>
                    <Route path ="/" element={<Home driverId ={"Samu1245875"}/>}/>
                    <Route path ="/manage-assigned-vehicle" element={<ManageAssignedVehicle driverId ={"Samu1245875"}/>}/>
                    <Route path ="/repair-requests" element={<RepairRequests driverId ={"Samu1245875"}/>}/>
                    <Route path ="/view-tasks" element={<ViewTasks driverId ={"Samu1245875"}/>}/>
                </Routes> 

            </AdminDashboardLayout>


                              
                  
                  

           




         
        </div>
    );
};

export default DriverHome2;