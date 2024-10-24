import axios from "../../../services/axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const maintenanceStatus = ["scheduled", "in-progress"];

const NewMaintenance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [technicians, setTechnicians] = useState([]);
  const [assetlist, setAssetlist] = useState([]);
  const [assetNumber, setAssetNumber] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/empManagement")
      .then((res) => {
        const technicians = res.data
          .filter((emp) => emp.designation === "Labour")
          .map((emp) => ({
            _id: emp._id,
            name: emp.firstName + " " + emp.lastName,
          }));
        console.log("Fetched technicians:", technicians);
        setTechnicians(technicians);
      })
      .catch((error) => {
        console.error("Error fetching technicians:", error);
      });

    if (id) {
      axios.get(`/assets/${id}`).then((res) => {
        setAssetNumber(res.data.assetNumber);
        setFormData((prevData) => ({
          ...prevData,
          assetId: res.data._id,
        }));
      });
    }
  }, [id]);

  const [formData, setFormData] = useState({
    assetId: "",
    scheduledDate: location.state?.scheduledDate
      ? new Date(location.state.scheduledDate).toISOString().split("T")[0]
      : "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assetNumber") {
      setAssetNumber(value);
      axios.get(`/assets/search/${value}`).then((res) => {
        if (res.data.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            assetId: res.data[0]._id,
          }));
          setAssetlist(res.data);
        }
      });
    } else if (name === "assignedTechnician") {
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
      .post("/maintenances", formData)
      .then((response) => {
        alert("Maintenance scheduled successfully!");
        setFormData({
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
        setAssetNumber("");
        navigate(`/admin/repair/maintenance`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to schedule maintenance. Please try again.");
      });
  };

  return (
    <div className="flex w-full justify-center items-start p-2">
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Schedule Maintenance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Asset Number:</label>
            <input
              type="text"
              name="assetNumber"
              value={assetNumber}
              disabled={id}
              onChange={handleChange}
              list="assetlist"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <datalist id="assetlist">
              {Array.isArray(assetlist) &&
                assetlist.map((asset) => (
                  <option key={asset._id} value={asset.assetNumber}>
                    {asset.assetNumber}
                  </option>
                ))}
            </datalist>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Scheduled Date:</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
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

export default NewMaintenance;
