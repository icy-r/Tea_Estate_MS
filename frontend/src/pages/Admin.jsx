import { useState } from 'react';
import Menubar from "../components/menubar/Menubar.jsx";
// eslint-disable-next-line no-unused-vars
import {Route, RouterProvider, Routes} from "react-router-dom";
import Home from "../components/repair-management/pages/home.jsx";
import FieldHome from "../components/field-management/pages/FieldHome.jsx";
import Header from "../components/navbar/Header.jsx";
import '../App.css'

function App() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Header props={setOpen} />
            <Menubar props={[open, setOpen]} />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/repair/*" element={<Home />} />
                <Route path="/field/*" element={<FieldHome />} />
            </Routes>
        </>
    )
}

export default App
