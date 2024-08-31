import React from 'react';
import Header from "../../navbar/Header";
import Menubar from "../../menubar/Menubar";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddField from "./AddField";

const FieldHome = () => {
    return (
        <>
        <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/add" element={<AddField />} />
    </Routes></>
    );
};

export default FieldHome;