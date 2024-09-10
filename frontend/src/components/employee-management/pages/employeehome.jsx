import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AddEmployee from "./AddEmployee.jsx";
import ManageEmployee from './ManageEployee.jsx';
// import UpdateFEmployee from './UpdateEmployee.jsx'

function EmployeeHome() {
    const [open, setOpen] = useState(false);
    return (
        <>

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/manageemployee/*" element={<ManageEmployee />} />
                <Route path="/addemployee/*" element={<AddEmployee />} />
                {/* <Route path="/manageemployee/:id" element={<UpdateFEmployee />} />  */}

            </Routes>
        </>
    )
}

export default EmployeeHome;
