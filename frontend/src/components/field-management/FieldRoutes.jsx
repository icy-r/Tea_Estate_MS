import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/FieldHome.jsx";
import AddField from "./pages/AddField";
import ManageField from "./pages/ManageField";
import UpdateField from "./pages/UpdateField";

const FieldRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<AddField/>}/>
                <Route path="/manage" element={<ManageField/>}/>
                <Route path="/manage/:id" element={<UpdateField/>}/>
            </Routes></>
    );
};

export default FieldRoutes;