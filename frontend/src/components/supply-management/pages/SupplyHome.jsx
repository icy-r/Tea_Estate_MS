import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import menuItems from '../data-files/menu.js';
// import StatusMain from "../component/SupplyStatusMain";
// import ErrorBoundary from "../../ErrorBoundary";



import {Route, Routes} from 'react-router-dom';
import AddSupply from "./AddSupply.jsx";
import ManageSupply from "./ManageSupply.jsx";
import UpdateSupply from "./UpdateSupply.jsx";
import AddSupplier from './AddSupplier.jsx';
import ManageSupplier from './ManageSupplier.jsx';
import OrderSupply from './OrderSupply.jsx';
import SupplyTypePieChart from '../components/SupplyTypePieChart.jsx';
import ViewHistory from '../pages/ViewHistory.jsx';


const SupplyHome = () => {
    return (
                <div>

                <AdminDashboardLayout menu={menuItems}>  

                {/* <ErrorBoundary>
                    <SupplyStatusMain/>
                </ErrorBoundary> */}

               
                <Routes>
                    <Route path="/" element={<SupplyTypePieChart />} />
                    <Route path="/add" element={<AddSupply />} />
                    <Route path="/manage" element={<ManageSupply />} /> 
                    <Route path='/addsupplier' element={<AddSupplier/>}/>
                    <Route path='/managesupplier' element={<ManageSupplier/>}/>
                    <Route path="/update/:id" element={<UpdateSupply />} />
                    <Route path="/ordersupplies" element={<OrderSupply />} />
                    <Route path="/viewhistory" element={<ViewHistory />} />

                 </Routes>
                      
                    
                </AdminDashboardLayout>


                </div>

    );
};

export default SupplyHome;