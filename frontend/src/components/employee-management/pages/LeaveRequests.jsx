import React, { useState, useEffect } from "react";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle error state

  useEffect(() => {
    // Fetch leave data from the API
    const fetchLeaves = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/employeeProfile"); // Adjust the API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging: check if data is being fetched correctly
        setLeaves(data);
        setLoading(false);  // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching leaves data:", error);
        setError(error.message); // Set the error message if fetch fails
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchLeaves();
  }, []);

  if (loading) {
    return <p className="text-center my-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 my-4">Error: {error}</p>;
  }


  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/leaves/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete leave request");
      }
      // Remove the leave request from the state after successful deletion
      setLeaves(leaves.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave request:", error);
      setError("Failed to delete the leave request.");
    }
  };

  return (
    <div className="min-h-screen bg-white-100">
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-left">Leave Requests</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                        <tr style={{ backgroundColor: '#1AACAC' }} className="text-white uppercase text-sm leading-normal">                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Reason</th>
                                <th className="py-3 px-6 text-left">Date From</th>
                                <th className="py-3 px-6 text-left">Date To</th>
                                <th className="py-3 px-6 text-left">Type</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {leaves.length > 0 ? (
                                leaves.map((leave) => (
                                    <tr key={leave._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6">{leave.Name}</td>
                                        <td className="py-3 px-6">{leave.Email}</td>
                                        <td className="py-3 px-6">{leave.Reason}</td>
                                        <td className="py-3 px-6">{leave.DateFrom}</td>
                                        <td className="py-3 px-6">{leave.DateTo}</td>
                                        <td className="py-3 px-6">{leave.type}</td>
                                        <td className="py-3 px-6 flex space-x-2">
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                onClick={() => handleApprove(leave._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                onClick={() => handleReject(leave._id)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-4 text-center">
                                        No leave records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

};

export default LeaveTable;
