import React from 'react';

const EmployeeDetailsManagement = () => {
    const detail = [
        { name: "Dilnuk De Silva", designation: "Manager", email: "dilnuk@example.com", contactNo: "1234567890" },
        { name: "John Doe", designation: "Developer", email: "john@example.com", contactNo: "9876543210" },
        { name: "Jane Doe", designation: "Designer", email: "jane@example.com", contactNo: "5678901234" },
        { name: "Alice Smith", designation: "Tester", email: "alice@example.com", contactNo: "2345678901" },
        { name: "Bob Johnson", designation: "Analyst", email: "bob@example.com", contactNo: "3456789012" },
        { name: "Charlie Brown", designation: "HR", email: "charlie@example.com", contactNo: "4567890123" },
        { name: "David Wilson", designation: "Sales", email: "david@example.com", contactNo: "5678901234" },
        { name: "Eve Davis", designation: "Support", email: "eve@example.com", contactNo: "6789012345" },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <nav className="w-80 bg-white">
            </nav>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 p-4 relative">
                        <button className="bg-action text-white border border-red-800 px-4 py-1 rounded absolute top-0 right-0 m-2">
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* Banner */}
                <div className="bg-teal-500 h-16 mb-4"></div>

                {/* Table */}
                <div>
                    <h2 className="text-xl font-bold mb-4 ml-5">Employee Details Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-teal-500 text-white">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Designation</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Contact No</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.map((employee, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-4">{employee.name}</td>
                                        <td className="p-4">{employee.designation}</td>
                                        <td className="p-4">{employee.email}</td>
                                        <td className="p-4">{employee.contactNo}</td>
                                        <td className="p-3 flex gap-2">
                                            <button className="bg-color_button text-white border border-green-700 px-4 py-1 rounded">EDIT</button>
                                            <button className="bg-action text-white border border-red-800 px-4 py-1 rounded">DELETE</button>
                                            <button className="bg-color_extra text-white border border-blue-600 px-4 py-1 rounded">REVIEW</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailsManagement;


