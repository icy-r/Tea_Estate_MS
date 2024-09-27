import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'; // Update the import statement for axios
import { useParams, useNavigate } from 'react-router-dom';
import LeaveForm from '../components/LeaveForm'; // Importing LeaveForm component
import EmployeeDetails from '../components/EmployeeDetails'; // Importing EmployeeDetails component

const EmployeeUpdate = () => {

    return (
        <div>
            {/* Parent div to wrap both components */}
            <EmployeeDetails />  {/* Render EmployeeDetails component */}
            <LeaveForm />  {/* Render LeaveForm component */}
        </div>
    );
}

export default EmployeeUpdate;
