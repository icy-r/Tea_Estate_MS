import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AddEmployee from "./AddEmployee.jsx";
import ManageEmployee from './ManageEployee.jsx';

function EmployeeHome() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div>
                <h1>Hi</h1>
            </div>

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/manageemployee/*" element={<ManageEmployee />} />
                <Route path="/addemployee/*" element={<AddEmployee />} />
            </Routes>
        </>
    )
}

export default EmployeeHome;
