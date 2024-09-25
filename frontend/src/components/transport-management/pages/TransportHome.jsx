import React from 'react';
import menuItems from '../data-files/menu.js';
import {Route, Routes} from "react-router-dom";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout.jsx";
import VehicleAddForm from '../component/VehicleAddForm.jsx';
import ManageVehicle from '../component/ManageVehicle.jsx';
import RouteAddForm from '../component/RouteAddForm.jsx';
import ManageRoute from '../component/ManageRoute.jsx';
import ManageTransport from '../component/manageTransportation.jsx';
import ConfigureTransport from '../component/configureTransportation.jsx';
import Home from './home.jsx';

const TransportHome = () => {
    return (
        <div>
        

            <AdminDashboardLayout menu={menuItems}>
          

                 <Routes>
                    <Route path ="/home" element={<Home/>}/>
                    <Route path="/add-vehicle" element={<VehicleAddForm />} />
                    <Route path="/manage-vehicle" element={<ManageVehicle />} />
                    <Route path="/manage-route" element={<ManageRoute/>} />
                    <Route path="/add-route" element={<RouteAddForm/>} />
                    <Route path="/configure-transport" element={<ConfigureTransport/>} />
                    <Route path="/manage-transport" element={<ManageTransport/>} />
                </Routes> 

            </AdminDashboardLayout>


                              
                  
                  

           




         
        </div>
    );
};

export default TransportHome;