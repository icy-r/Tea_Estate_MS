import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle error state
  const [employees, setEmployees] = useState([]);
  
  const [openApproveDialog, setOpenApproveDialog] = useState(false); // For approve dialog
  const [openRejectDialog, setOpenRejectDialog] = useState(false); // For reject dialog
  const [selectedLeaveId, setSelectedLeaveId] = useState(null); // Track selected leave for action
  
  const URL = "/empManagement/";

  useEffect(() => {
    // Fetch leave data from the API
    const fetchLeaves = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/employeeProfile"); // Adjust the API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const data = await response.json();
        // Add a status field to each leave object
        const leavesWithStatus = data.map(leave => ({
          ...leave,
          status: "Pending" // Initialize status as "Pending"
        }));
        console.log("Fetched data:", leavesWithStatus); // Debugging: check if data is being fetched correctly
        setLeaves(leavesWithStatus);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching leaves data:", error);
        setError(error.message); // Set the error message if fetch fails
        setLoading(false); // Set loading to false in case of an error
      }
    };
  
    fetchLeaves();
    fetchHandler();
  }, []);
  

  const fetchHandler = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/empManagement");
      setEmployees(response.data);
  
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching employee data!", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const leave = leaves.find((leave) => leave._id === id);
      if (!leave) {
        console.error("Leave request not found");
        return;
      }
  
      const employee = employees.find((emp) => emp.email === leave.Email);
      if (!employee) {
        console.error("Employee not found for this leave request");
        return;
      }
  
      const dateFrom = new Date(leave.DateFrom);
      const dateTo = new Date(leave.DateTo);
      const timeDiff = dateTo - dateFrom;
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end date
  
      if (employee.leavesLeft < daysDiff) {
        console.error("Not enough leaves left for this employee");
        return;
      }
  
      const updatedLeavesLeft = employee.leavesLeft - daysDiff;
  
      await axios.put(`http://localhost:3001/api/empManagement/${employee._id}`, {
        leavesLeft: updatedLeavesLeft
      });

      // Update the leave's status to "Approved"
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === id ? { ...leave, status: "Approved" } : leave
        )
      );
  
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === employee._id ? { ...emp, leavesLeft: updatedLeavesLeft } : emp
        )
      );
  
      console.log(`Leave approved for ${leave.Name}. Days deducted: ${daysDiff}`);
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const confirmApprove = (id) => {
    setSelectedLeaveId(id);
    setOpenApproveDialog(true);
  };

  const confirmReject = (id) => {
    setSelectedLeaveId(id);
    setOpenRejectDialog(true);
  };


  const handleReject = async (id) => {
    try {
      console.log(`Attempting to reject leave request with ID: ${id}`); // Debugging line
      // Use axios to send a DELETE request to the API
      const response = await axios.delete(`http://localhost:3001/api/employeeProfile/${id}`);
      
  
      // If successful, remove the leave request from the state
      if (response.status === 200) {
        setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave._id !== id));
        console.log(`Leave request with ID: ${id} has been successfully rejected.`);
      } else {
        throw new Error("Failed to delete leave request");
      }
    } catch (error) {
      console.error("Error deleting leave request:", error);
      setError("Failed to delete the leave request.");
    }
  };
  
  

  const handleApproveDialogClose = (confirmed) => {
    setOpenApproveDialog(false);
    if (confirmed && selectedLeaveId) {
      handleApprove(selectedLeaveId);
    }
  };

  const handleRejectDialogClose = (confirmed) => {
    setOpenRejectDialog(false);
    if (confirmed && selectedLeaveId) {
      handleReject(selectedLeaveId);
    }
  };
  

  if (loading) {
    return <p className="text-center my-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 my-4">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-white-100">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">
            Leave Requests
          </h1>
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr
                  style={{ backgroundColor: "#1AACAC" }}
                  className="text-white uppercase text-sm leading-normal"
                >
                  <th className="py-3 px-4 text-left w-1/8">Name</th>
                  <th className="py-3 px-4 text-left w-1/6">Email</th>
                  <th className="py-3 px-4 text-left w-1/12">Leaves Left</th>
                  <th className="py-3 px-4 text-left w-1/6">Reason</th>
                  <th className="py-3 px-4 text-left w-1/8">Date From</th>
                  <th className="py-3 px-4 text-left w-1/8">Date To</th>
                  <th className="py-3 px-4 text-left w-1/12">Type</th>
                  <th className="py-3 px-4 text-left w-1/12">Status</th> {/* New Status Column */}
                  <th className="py-3 px-4 text-left w-1/12">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {leaves.length > 0 ? (
                  leaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4">{leave.Name}</td>
                      <td className="py-3 px-4">{leave.Email}</td>
                      {
                        employees.some(emp => emp.email === leave.Email)
                          ? employees.map(emp =>
                              emp.email === leave.Email && (
                                <td className="py-3 px-4" key={emp.email}>{emp.leavesLeft}</td>
                              )
                            )
                          : <td className="py-3 px-4">{leave.leavesLeft}</td>
                      }
                      <td className="py-3 px-4">{leave.Reason}</td>
                      <td className="py-3 px-4">{leave.DateFrom}</td>
                      <td className="py-3 px-4">{leave.DateTo}</td>
                      <td className="py-3 px-4">{leave.type}</td>
                      <td className="py-3 px-4">{leave.status}</td> {/* Display status */}
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                          onClick={() => confirmApprove(leave._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                          onClick={() => confirmReject(leave._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-4 text-center">
                      No leave records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {/* Approve Dialog */}
      <Dialog
        open={openApproveDialog}
        onClose={() => handleApproveDialogClose(false)}
      >
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this leave request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleApproveDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleApproveDialogClose(true)} color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Reject Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={() => handleRejectDialogClose(false)}
      >
        <DialogTitle>Confirm Rejection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this leave request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRejectDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleRejectDialogClose(true)} color="primary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
};

export default LeaveTable;