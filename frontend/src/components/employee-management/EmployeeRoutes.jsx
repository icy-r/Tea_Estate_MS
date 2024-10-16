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
import VacancyForm from './components/rolesAdd';
import VacancyDisplay from './components/VacancyDisplay';  
import PublicVacancyTable from './components/publicVacncyTable';    
import ApplicantDetails from './pages/ApplicantDetails';
import EmployeePrifileUpdate from './pages/EmployeeProfileUpdate';


const EmployeeRoutes = () => {

    return(
        <>
            <AdminDashboardLayout menu={menu}> 
            <Routes>
                <Route path="/" element={<EmployeeDetails />} />
                <Route path="/employeedetails/*" element={<EmployeeDetails />} />
                <Route path="/update/:id" element={<EmployeeUpdate />} /> {/* Updated path */}
                <Route path="/employeeadd/*" element={<EmployeeAdd />} />
                <Route path="/applicantadd/*" element={<ApplicantAdd/>} />  
                <Route path="/applicantaccept/*" element={<ApplicantAccept/>} />
                <Route path="/employeemoredetails/:id" element={<EmployeeMoreDetails />} />
                <Route path="/employeehome/*" element={<EmployeeHome />} />
                <Route path="/employeeProfile/*" element={<EmployeeProfile/>}/> 
                <Route path="/requestleave/*" element={<LeaveRequest/>}/>
                <Route path="/vacancyForm/*"element={<VacancyForm/>} />
                <Route path="/vacancyDisplay/*" element={<VacancyDisplay/>} />
                <Route path='/publicVacancyTable/*' element={<PublicVacancyTable/>} />
                <Route path='/applicantdetails/*' element={<ApplicantDetails/>} />
                <Route path='/employeeprofileupdate/*' element={<EmployeePrifileUpdate/>} />    
            </Routes>
            </AdminDashboardLayout>
        </>
    );
};

export default EmployeeRoutes;