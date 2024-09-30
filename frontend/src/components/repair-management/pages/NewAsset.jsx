import React, { useState } from "react";
import axios from "../../../services/axios";

const NewAsset = () => {
  const [formData, setFormData] = useState({
    assetNumber: "",
    assetType: "vehicle",
    name: "",
    model: "",
    manufacturer: "",
    purchaseDate: "",
    lastMaintenanceDate: "",
    nextScheduledMaintenance: "",
    status: "operational",
    location: "",
    maintenanceHistory: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3001/api/assets", formData);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(formData);
  };

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">New Asset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Asset Number:</label>
            <input
              type="text"
              name="assetNumber"
              value={formData.assetNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Asset Type:</label>
            <select
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="vehicle">Vehicle</option>
              <option value="machinery">Machinery</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Model:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Manufacturer:</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Purchase Date:</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Last Maintenance Date:
            </label>
            <input
              type="date"
              name="lastMaintenanceDate"
              value={formData.lastMaintenanceDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Next Scheduled Maintenance:
            </label>
            <input
              type="date"
              name="nextScheduledMaintenance"
              value={formData.nextScheduledMaintenance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="operational">Operational</option>
              <option value="under maintenance">Under Maintenance</option>
              <option value="out of service">Out of Service</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAsset;
