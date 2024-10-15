import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { useParams, useNavigate } from "react-router-dom";

const maintenanceStatus = ["scheduled", "in-progress", "completed"];

const EditMaintenance = ({ onClose }) => {
  const [technicians, setTechnicians] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: "",
    scheduledDate: "",
    maintenanceType: "",
    description: "",
    assignedTechnician: {
      name: "",
      technicianId: "",
    },
    status: "",
    completionDate: "",
    notes: "",
  });

  useEffect(() => {
    Promise.all([axios.get("/empManagement"), axios.get(`/maintenances/${id}`)])
      .then(([techRes, maintenanceRes]) => {
        const techData = techRes.data
          .filter((emp) => emp.designation === "Labour")
          .map((emp) => ({
            _id: emp._id,
            name: `${emp.firstName} ${emp.lastName}`,
          }));
        setTechnicians(techData);

        const maintenanceData = maintenanceRes.data;
        setFormData(maintenanceData);

        // Fetch asset name
        axios
          .get(`/assets/${maintenanceData.assetId}`)
          .then((assetRes) => {
            setAssetName(assetRes.data.name);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching asset:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

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
    console.log("Form submitted:", formData);

    axios
      .put(`/maintenances/${id}`, formData)
      .then((response) => {
        alert("Maintenance updated successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to update maintenance. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Edit Maintenance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Asset Name:</label>
            <input
              type="text"
              value={assetName}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Scheduled Date:</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate.split("T")[0]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Maintenance Type:</label>
            <input
              type="text"
              name="maintenanceType"
              value={formData.maintenanceType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
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
          <div className="mb-4">
            <label className="block text-gray-700">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Status</option>
              {maintenanceStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {formData.status === "completed" && (
            <div className="mb-4">
              <label className="block text-gray-700">Completion Date:</label>
              <input
                type="date"
                name="completionDate"
                value={
                  formData.completionDate
                    ? formData.completionDate.split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              // also navigate to the maintenance page
              onClick={() => {
                //if onclose is not defined, navigate to the maintenance page
                if (onClose) {
                  onClose();
                }
                navigate(`/admin/repair/viewmaintenance/${id}`);
              }}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMaintenance;
