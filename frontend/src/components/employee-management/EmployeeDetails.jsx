import { useEffect, useState } from 'react';
import React from 'react';
import axios from '../../services/axios.js';
import EmployeeComponent from './EmployeeComponent.jsx';
import { useNavigate } from 'react-router-dom';
// import { usseReactToPrint } from "react-to-print";


const URL = "/empManagement";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(URL);
                setEmployees(response.data);
            } catch (error) {
                console.error("There was an error fetching employee data!", error);
            }
        };

        fetchHandler();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/admin/employee/update/${id}`); // Navigate to update page with employee ID
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            // Update the employee list after deletion
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
        } catch (error) {
            console.error("There was an error deleting the employee!", error);
        }
    };

    const ComponentsRef = UseRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle:"Employee Report",
        onafterprint:()=>alert("Employee Report Successfully Download !")

    })

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredEmployees = data.employees.filter((employee) =>
            Object.values(employee).some((field)=>
            field. toString().toLowercase().includes(searchQuery.toLowerCase())
        ))
        setEmployees(filteredEmployees);
        setNoResults(filteredEmployees.length === 0);
        });
    }







    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Management</h1>
                    <h2 className="text-xl text-gray-600 mb-8">Employee Details Page</h2>
                    {/* added search bar */}
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        name="search"
                        placeholder='Search User Details'
                    ></input>

                    <button onClick={handleSearch}>Search</button>

                    {noResults ? (
                            <div>
                                <p>No Employees Found</p>
                            </div>
                    ) : (


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees && employees.map((employee) => (
                            // added ref={ComponentsRef}
                            <div ref={ComponentsRef} key={employee._id} className="bg-white shadow-lg rounded-lg p-4">
                                <EmployeeComponent employee={employee} />
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleUpdate(employee._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                    {/* <button
                                        onClick={() => handlePrint(employee._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Download
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>

                
                )}


                </div>
            </div>
        </div>
    );
}

export default EmployeeManagement;
