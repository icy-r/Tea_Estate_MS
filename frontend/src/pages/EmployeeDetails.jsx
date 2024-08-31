
import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../services/axios';
import Employeeco from '../components/EmployeeManagement/EmployeeComponent.jsx';

const URL = "/empManagement/";


function EmployeeManagement() {

    const [employees, setEmployees] = useState();


    useEffect(() => {

        const fetchHandler = async () => {
            return await axios.get(URL).then((res) => {
                setEmployees(res.data)
                res.data
                console.log(res.data);
            });
        }

        fetchHandler()
    }, [employees]);

    return (
        <div>
            <h1>Employee Management</h1>
            <h2>Employee Details Page</h2>
            <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Management</h1>
                    <h2 className="text-xl text-gray-600 mb-8">Employee Details Page</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees && employees.map((employee, i) => (
                            <div key={i} className="bg-white shadow-lg rounded-lg p-4">
                                <Employeeco employee={employee} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default EmployeeManagement;

