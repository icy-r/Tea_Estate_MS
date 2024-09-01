import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddField from "./AddField";
import ManageField from "./ManageField";
import UpdateField from "./UpdateField";

const FieldHome = () => {
    return (
        <>
        <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/add" element={<AddField />} />
        <Route path="/manage" element={<ManageField />} />
        <Route path="/manage/:id" element={<UpdateField />} /> 
    </Routes></>
    );
};

export default FieldHome;