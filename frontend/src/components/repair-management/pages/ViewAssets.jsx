import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { useNavigate } from "react-router-dom";

const ViewAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">View Assets</h1>
      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <table className="min-w-full bg-white border-collapse border border-slate-400 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Asset Number</th>
              <th className="py-2 px-4 border-b">Asset Type</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Model</th>
              <th className="py-2 px-4 border-b">Manufacturer</th>
              <th className="py-2 px-4 border-b">Purchase Date</th>
              <th className="py-2 px-4 border-b">Last Maintenance Date</th>
              <th className="py-2 px-4 border-b">Next Scheduled Maintenance</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Location</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset._id}
                onClick={() =>
                  navigate(`/admin/repair/assetDetails/${asset._id}`)
                }
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="py-2 px-4 border-b">{asset.assetNumber}</td>
                <td className="py-2 px-4 border-b">{asset.assetType}</td>
                <td className="py-2 px-4 border-b">{asset.name}</td>
                <td className="py-2 px-4 border-b">{asset.model}</td>
                <td className="py-2 px-4 border-b">{asset.manufacturer}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(asset.lastMaintenanceDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(
                    asset.nextScheduledMaintenance
                  ).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{asset.status}</td>
                <td className="py-2 px-4 border-b">{asset.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAssets;
