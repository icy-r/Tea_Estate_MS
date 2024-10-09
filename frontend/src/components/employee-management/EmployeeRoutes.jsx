import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmployeeAdd  from './pages/EmployeeAdd';   
import EmployeeUpdate from './pages/EmployeeUpdate';
import EmployeeDetails from './pages/EmployeeDetails';
import ApplicantAdd from './pages/ApplicantAdd';
import ApplicantAccept from './pages/ApplicantAccept';
import EmployeeHome from './EmployeeHome';  
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import EmployeeMoreDetails from './pages/EmployeeMoreDetails';
import EmployeeProfile from './pages/EmployeeProfile';
import menu from './data-files/menu'; 
import LeaveRequest from './pages/LeaveRequests';


const EmployeeRoutes = () => {

    return(
        <>
            <AdminDashboardLayout menu={menu}> 
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/employeedetails/*" element={<EmployeeDetails />} />
                <Route path="/update/:id" element={<EmployeeUpdate />} /> {/* Updated path */}
                <Route path="/employeeadd/*" element={<EmployeeAdd />} />
                <Route path="/applicantadd/*" element={<ApplicantAdd/>} />  
                <Route path="/applicantaccept/*" element={<ApplicantAccept/>} />
                <Route path="/employeemoredetails/:id" element={<EmployeeMoreDetails />} />
                <Route path="/employeehome/*" element={<EmployeeHome />} />
                <Route path="/employeeProfile/*" element={<EmployeeProfile/>}/> 
                <Route path="/requestleave/*" element={<LeaveRequest/>}/>
            </Routes>
            </AdminDashboardLayout>
        </>
    );
};

export default EmployeeRoutes;