import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'; // Update the import statement for axios
import { useParams, useNavigate } from 'react-router-dom';
import LeaveForm from '../components/LeaveForm'; // Importing LeaveForm component
import EmployeeDetails from '../components/EmployeeDetails'; // Importing EmployeeDetails component

const EmployeeUpdate = () => {
    const id = '66f315106d733222917e98d5';

    return (
        <div className="flex items-start justify-between space-x-4 min-h-screen p-6">
            {/* Wrap both components inside a flexbox container */}
            <div className="w-1/2">
                <EmployeeDetails _id={id}/>  {/* Render EmployeeDetails component */}
            </div>
            <div className="w-1/2">
                <LeaveForm />  {/* Render LeaveForm component */}
            </div>
        </div>
    );
}

export default EmployeeUpdate;
