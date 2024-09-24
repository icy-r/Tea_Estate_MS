import React from 'react';
import menuItems from '../data-files/menu.js';
import {Route, Routes} from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import VehicleAddForm from '../component/VehicleAddForm.jsx';
import ManageVehicle from '../component/ManageVehicle.jsx';
import RouteAddForm from '../component/RouteAddForm.jsx';
import ManageRoute from '../component/ManageRoute.jsx';

const TransportHome = () => {
    return (
        <div>
        

            <AdminDashboardLayout menu={menuItems}>
          

                 <Routes>
                    <Route path="/add-vehicle" element={<VehicleAddForm />} />
                    <Route path="/manage-vehicle" element={<ManageVehicle />} />
                    <Route path="/manage-route" element={<ManageRoute/>} />
                    <Route path="/add-route" element={<RouteAddForm/>} />
                </Routes> 

            </AdminDashboardLayout>


                              
                  
                  

           




         
        </div>
    );
};

export default TransportHome;