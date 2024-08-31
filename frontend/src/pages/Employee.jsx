import { useState } from 'react';
import { Route, RouterProvider, Routes } from "react-router-dom";
import Header from '../components/navbar/Header.jsx';
import Menubar from '../components/menubar/Menubar.jsx';
import Home from '../components/repair-management/pages/home.jsx';
import AddEmployee from "../components/EmployeeManagement/AddEmployee.jsx";
import EmpDetailsTable from "../components/EmployeeManagement/EmpDetailsTable.jsx";
import LeaveTable from "../components/EmployeeManagement/LeaveTable.jsx";
import EmployeeDetails from "../pages/EmployeeDetails.jsx";
import '../App.css';

function Employee() {  // This is renamed to avoid conflict
    const [open, setOpen] = useState(false);
    return (
        <>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />
            <AddEmployee />
            <br />
            <EmpDetailsTable />
            <br />
            <LeaveTable />
            <br />
            <EmployeeDetails />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/repair/*" element={<Home />} />
            </Routes>
        </>
    )
}

export default Employee;
