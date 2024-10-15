import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { getUser } from "../../../services/auth-service";

const ReqMaintenance = () => {
  const [technicians, setTechnicians] = useState([]);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    requestType: "repair",
    priority: "low",
    description: "",
    requestedBy: {
      employeeId: "",
      name: "",
    },
    assignedTo: {
      technicianId: "",
      name: "",
    },
    asset: {
      assetId: "",
      assetType: "",
      assetName: "",
    },
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    fetchTechnicians();
    fetchAssets();

    const currentUser = getUser();
    setFormData((prevData) => ({
      ...prevData,
      requestedBy: {
        employeeId: currentUser._id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
      },
    }));
  }, []);

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

  const fetchAssets = async () => {
    try {
      const response = await axios.get("/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "assignedTo") {
      const selectedTechnician = technicians.find((tech) => tech._id === value);
      setFormData((prevData) => ({
        ...prevData,
        assignedTo: {
          technicianId: selectedTechnician._id,
          name: selectedTechnician.name,
        },
      }));
    } else if (name === "asset") {
      const selectedAsset = assets.find((asset) => asset._id === value);
      setFormData((prevData) => ({
        ...prevData,
        asset: {
          assetId: selectedAsset._id,
          assetType: selectedAsset.assetType,
          assetName: selectedAsset.name,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/requestmaintenance", formData);
      setConfirmationMessage("Maintenance request submitted successfully!");
      setFormData({
        requestType: "repair",
        priority: "low",
        description: "",
        requestedBy: {
          employeeId: "",
          name: "",
        },
        assignedTo: {
          technicianId: "",
          name: "",
        },
        asset: {
          assetId: "",
          assetType: "",
          assetName: "",
        },
      });
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
      setConfirmationMessage(
        "Failed to submit maintenance request. Please try again."
      );
    }
  };

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Request Maintenance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Request Type:</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="repair">Repair</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Assigned Technician:</label>
            <select
              name="assignedTo"
              value={formData.assignedTo.technicianId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Technician</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Asset:</label>
            <select
              name="asset"
              value={formData.asset.assetId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Asset</option>
              {assets.map((asset) => (
                <option key={asset._id} value={asset._id}>
                  {asset.name} ({asset.assetType})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {confirmationMessage && <p className="mt-4">{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default ReqMaintenance;
