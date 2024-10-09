import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const ReqMaintenance = () => {
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    vehicleId: "",
    issueDescription: "",
    location: "",
    assignedTechnician: {
      name: "",
      technicianId: "",
    },
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/empManagement")
      .then((res) => {
        const technicians = res.data
          .filter((emp) => emp.designation === "Labour")
          .map((emp) => ({
            _id: emp._id,
            name: emp.firstName + " " + emp.lastName,
          }));
        setTechnicians(technicians);
      })
      .catch((error) => {
        console.error("Error fetching technicians:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignedTechnician") {
      const selectedTechnician = technicians.find((tech) => tech._id === value);
      if (selectedTechnician) {
        setFormData((prevData) => ({
          ...prevData,
          assignedTechnician: {
            name: selectedTechnician.name,
            technicianId: selectedTechnician._id,
          },
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("requestmaintenance/", formData)
      .then(() => {
        setConfirmationMessage("Issue reported successfully!");
        setFormData({
          vehicleId: "",
          issueDescription: "",
          location: "",
          assignedTechnician: {
            name: "",
            technicianId: "",
          },
        });
      })
      .catch((error) => {
        console.error("Error reporting issue:", error);
        setConfirmationMessage("Failed to report issue. Please try again.");
      });
  };

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Report Vehicle Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle ID:</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Issue Description:</label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
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
          <div className="mb-4">
            <label className="block text-gray-700">Assigned Technician:</label>
            <select
              name="assignedTechnician"
              value={formData.assignedTechnician.technicianId}
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
