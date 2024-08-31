import React from 'react';

const EmployeeLeaveManagement = () => {
    // Sample data for demonstration
    const leaves = [
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        // Replicate this for 8 rows
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
        { name: "Dilnuk De Silva", reason: "Funeral", dateFrom: "22.08.2024", dateTo: "23.08.2024", email: "dilnuk@gmail.com" },
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

                {/* Other content */}
                </div>
 
                    
                    
                </div>

                {/* Banner */}
                <div className="bg-teal-500 h-16 mb-4"></div>

                {/* Table */}
                <div>
                    <h2 className="text-xl font-bold mb-4 ml-5">Employee Leave Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-teal-500 text-white">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Reason</th>
                                    <th className="p-4">Date From</th>
                                    <th className="p-4">Date To</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-4">{leave.name}</td>
                                        <td className="p-4">{leave.reason}</td>
                                        <td className="p-4">{leave.dateFrom}</td>
                                        <td className="p-4">{leave.dateTo}</td>
                                        <td className="p-4">{leave.email}</td>
                                        <td className="p-3 flex gap-2">
                                        <button className="bg-color_button text-white border border-green-700 px-4 py-1 rounded">APPROVE</button>
                                        <button className="bg-action text-white border border-red-800 px-4 py-1 rounded">REJECT</button>
                                        <button className="bg-color_extra text-white border border border-blue-600 px-4 py-1 rounded">REVIEW</button>
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

export default EmployeeLeaveManagement;

