import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddField from "./AddField";
import ManageField from "./ManageField";
import UpdateField from "./UpdateField";
import StatusMain from "../component/StatusMain";
import ErrorBoundary from "../../ErrorBoundary";

const FieldHome = () => {
    return (
        <>
         <ErrorBoundary>
                <StatusMain/>
            </ErrorBoundary>
        <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/add" element={<AddField />} />
        <Route path="/manage" element={<ManageField />} />
        <Route path="/manage/:id" element={<UpdateField />} /> 
    </Routes></>
    );
};

export default FieldHome;