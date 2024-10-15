import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../services/axios.js";

const EditMaintenanceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    requestNumber: "",
    status: "",
    asset: { assetName: "" },
    createdAt: "",
    description: "",
    priority: "",
    assignedTo: { technicianId: "", name: "" },
  });
  const [loading, setLoading] = useState(true);
  const [technicians, setTechnicians] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchRequest();
    fetchTechnicians();
  }, []);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`/requestMaintenance/${id}`);
      setRequest(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get("/empManagement");
      const technicianData = response.data
        .filter((emp) => emp.designation === "Labour")
        .map((emp) => ({
          _id: emp._id,
          name: `${emp.firstName} ${emp.lastName}`,
        }));
      setTechnicians(technicianData);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "assignedTo") {
      const selectedTechnician = technicians.find((tech) => tech._id === value);
      setRequest((prev) => ({
        ...prev,
        assignedTo: {
          technicianId: selectedTechnician._id,
          name: selectedTechnician.name,
        },
      }));
    } else {
      setRequest((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRequest = { ...request };
      await axios.put(`/requestMaintenance/${id}`, updatedRequest);
      navigate("/admin/repair/viewreports");
    } catch (error) {
      console.error("Error updating maintenance request:", error);
      setAlert({
        open: true,
        message: "Failed to update maintenance request. Please try again.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit Maintenance Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Request Number:</label>
          <input
            type="text"
            name="requestNumber"
            value={request.requestNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-1">Status:</label>
          <select
            name="status"
            value={request.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Asset:</label>
          <input
            type="text"
            name="asset.assetName"
            value={request.asset.assetName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={request.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Priority:</label>
          <select
            name="priority"
            value={request.priority}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Assigned Technician:</label>
          <select
            name="assignedTo"
            value={request.assignedTo.technicianId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Technician</option>
            {technicians.map((tech) => (
              <option key={tech._id} value={tech._id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMaintenanceRequest;
