import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignedTasks = () => {
  const [requests, setRequests] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = axios.get("/api/technician/requests");
    const fetchSchedules = axios.get("/api/technician/schedules");

    Promise.all([fetchRequests, fetchSchedules])
      .then(([requestsResponse, schedulesResponse]) => {
        setRequests(requestsResponse.data);
        setSchedules(schedulesResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Assigned Tasks</h1>
      <h2>Maintenance Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Requested By</th>
            <th>Assigned To</th>
            <th>Asset</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(requests) &&
            requests.map((request) => (
              <tr key={request._id}>
                <td>{request.requestNumber}</td>
                <td>{request.requestType}</td>
                <td>{request.status}</td>
                <td>{request.priority}</td>
                <td>{request.description}</td>
                <td>{request.requestedBy.name}</td>
                <td>{request.assignedTo.name}</td>
                <td>{request.asset.assetName}</td>
                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Maintenance Schedules</h2>
      <table>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Scheduled Date</th>
            <th>Maintenance Type</th>
            <th>Description</th>
            <th>Assigned Technician</th>
            <th>Status</th>
            <th>Completion Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(schedules) &&
            schedules.map((schedule) => (
              <tr key={schedule._id}>
                <td>{schedule.assetId}</td>
                <td>{new Date(schedule.scheduledDate).toLocaleDateString()}</td>
                <td>{schedule.maintenanceType}</td>
                <td>{schedule.description}</td>
                <td>{schedule.assignedTechnician.name}</td>
                <td>{schedule.status}</td>
                <td>
                  {schedule.completionDate
                    ? new Date(schedule.completionDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{schedule.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedTasks;
