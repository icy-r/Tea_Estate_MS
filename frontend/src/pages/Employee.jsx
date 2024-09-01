import { useState } from 'react';
import { Route, RouterProvider, Routes } from "react-router-dom";
import Header from '../components/navbar/Header.jsx';
import Menubar from '../components/menubar/Menubar.jsx';
import Home from '../components/repair-management/pages/home.jsx';
import EmployeeDetails from "../components/EmployeeManagement/EmployeeDetails.jsx";
import EmployeeAdd from '../components/EmployeeManagement/EmployeeAdd.jsx';
import EmpUpdate from '../components/EmployeeManagement/EmployeeUpdate.jsx';

import '../App.css';

function Employee() {  // This is renamed to avoid conflict
    const [open, setOpen] = useState(false);
    return (
        <>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />
            <br />
            <EmployeeDetails />
            <br />
            <EmployeeAdd />
            <br />   

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/repair/*" element={<Home />} />
            </Routes>
        </>
    )
}

export default Employee;
