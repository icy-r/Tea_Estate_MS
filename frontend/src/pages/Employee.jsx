import { useState } from 'react';
import { Route, RouterProvider, Routes } from "react-router-dom";
import EmployeeDetails from "../components/EmployeeManagement/EmployeeDetails.jsx";
import EmployeeAdd from '../components/EmployeeManagement/EmployeeAdd.jsx';
import EmployeeUpdate from '../components/EmployeeManagement/EmployeeUpdate.jsx';

function Employee() {  // This is renamed to avoid conflict
    const [open, setOpen] = useState(false);
    return (
        <>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/employeedetails/*" element={<EmployeeDetails />} />
                <Route path="/employee/update/:id" element={<EmployeeUpdate />} />
                <Route path="/employeeadd/*" element={<EmployeeAdd />} />
                
            </Routes>
        </>
    )
}

export default Employee;




