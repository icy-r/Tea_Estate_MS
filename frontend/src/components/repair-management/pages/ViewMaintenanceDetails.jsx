import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewMaintenanceDetails = () => {
  const { id } = useParams();
  const [maintenanceDetails, setMaintenanceDetails] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`/maintenances/${id}`)
      .then((response) => {
        navigate("/admin/repair/maintenance");
      })
      .catch((error) => {
        console.error("Error deleting maintenance:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`/maintenances/${id}`)
      .then((response) => {
        setMaintenanceDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching maintenance details:", error);
      });
  }, [id]);

  if (!maintenanceDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Maintenance Details
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-medium">Description:</span>{" "}
            {maintenanceDetails.description}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Scheduled Date:</span>{" "}
            {new Date(maintenanceDetails.scheduledDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Maintenance Type:</span>{" "}
            {maintenanceDetails.maintenanceType}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                maintenanceDetails.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {maintenanceDetails.status}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Technician:</span>{" "}
            {maintenanceDetails.assignedTechnician ? (
              maintenanceDetails.assignedTechnician.name
            ) : (
              <span className="text-red-500">Not assigned</span>
            )}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Asset ID:</span>{" "}
            {maintenanceDetails.assetId}
          </p>
          {maintenanceDetails.completionDate && (
            <p className="text-gray-700">
              <span className="font-medium">Completion Date:</span>{" "}
              {new Date(maintenanceDetails.completionDate).toLocaleDateString()}
            </p>
          )}
          {maintenanceDetails.notes && (
            <p className="text-gray-700">
              <span className="font-medium">Notes:</span>{" "}
              {maintenanceDetails.notes}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/admin/repair/maintenance")}
        >
          Back
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/admin/repair/editmaintenance/${id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewMaintenanceDetails;
