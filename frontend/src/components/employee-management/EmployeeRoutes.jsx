import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmployeeAdd  from './EmployeeAdd';   
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeDetails from './EmployeeDetails';
import Home from './EmployeeHome'

const EmployeeRoutes = () => {

    return(

    
        <>
            <h1>Employee Data Base</h1>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/employeedetails/*" element={<EmployeeDetails />} />
                <Route path="/employee/update/:id/" element={<EmployeeUpdate />} />
                <Route path="/employeeadd/*" element={<EmployeeAdd />} />
            </Routes>
        </>
    );
};

export default EmployeeRoutes;