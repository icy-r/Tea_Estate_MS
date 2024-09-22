import { useState } from 'react';
import Menubar from "../components/menubar/Menubar.jsx";
import Home from "../components/repair-management/pages/home.jsx";
import FieldHome from "../components/field-management/pages/FieldHome.jsx";
import {Route, Routes} from "react-router-dom";
import RepairRoutes from "../components/repair-management/repair-routes.jsx";
import Header from "../components/navbar/Header.jsx";
import '../App.css'

function App() {
    const [open, setOpen] = useState(false);
    const isAdmin = true;
    return (
        <>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/repair/*" element={<Home />} />
                <Route path="/field/*" element={<FieldHome />} />
                <Route path="/repair/*" element={<RepairRoutes />} />

            </Routes>
        </>
    )
}

export default App
