import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const RepairRequestList = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    fetchRepairRequests();
  }, []);

  const fetchRepairRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/requestmaintenance/");
      setRepairRequests(response.data);
      console.log("Repair requests fetched successfully:", response.data);
      setAlert({
        open: true,
        message: "Repair requests fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error fetching repair requests:", error);
      setAlert({
        open: true,
        message: "Failed to fetch repair requests.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));
      }, 3000);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-4">Available Repair Requests</h2>

      {loading ? (
        <p>Loading repair requests...</p>
      ) : (
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Vehicle ID</th>
              <th className="px-4 py-2 border">Issue Description</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {repairRequests.length > 0 ? (
              repairRequests.map((request, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{request.vehicleId}</td>
                  <td className="border px-4 py-2">{request.description}</td>
                  <td className="border px-4 py-2">{request.location}</td>
                  <td className="border px-4 py-2">{request.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No repair requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RepairRequestList;
