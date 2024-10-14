import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AssetPerformance = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [assetDetails, setAssetDetails] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchAssetPerformance = async (assetId) => {
    try {
      const response = await axios.get(`/assets/${assetId}/performance`);
      // Assuming the API returns an object with multiple performance metrics
      const { uptime, efficiency, maintenanceFrequency } = response.data;

      setPerformanceData({
        labels: uptime.labels, // Assuming all metrics have the same labels
        datasets: [
          {
            label: "Uptime (%)",
            data: uptime.data,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Efficiency (%)",
            data: efficiency.data,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
          },
          {
            label: "Maintenance Frequency",
            data: maintenanceFrequency.data,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching asset performance:", error);
    }
  };

  const fetchAssetDetails = async (assetId) => {
    try {
      const response = await axios.get(`/assets/${assetId}`);
      setAssetDetails(response.data);
    } catch (error) {
      console.error("Error fetching asset details:", error);
    }
  };

  const handleAssetSelect = (assetId) => {
    setSelectedAsset(assetId);
    fetchAssetPerformance(assetId);
    fetchAssetDetails(assetId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Performance Tracking</h1>
      <select
        onChange={(e) => handleAssetSelect(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select an asset</option>
        {assets.map((asset) => (
          <option key={asset._id} value={asset._id}>
            {asset.name}
          </option>
        ))}
      </select>
      {assetDetails && (
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
            Asset Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Asset Number:</span>{" "}
              <span className="text-gray-800">{assetDetails.assetNumber}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Asset Type:</span>{" "}
              <span className="text-gray-800">{assetDetails.assetType}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span>{" "}
              <span className="text-gray-800">{assetDetails.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Model:</span>{" "}
              <span className="text-gray-800">{assetDetails.model}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Manufacturer:</span>{" "}
              <span className="text-gray-800">{assetDetails.manufacturer}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Purchase Date:</span>{" "}
              <span className="text-gray-800">
                {new Date(assetDetails.purchaseDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Last Maintenance Date:</span>{" "}
              <span className="text-gray-800">
                {new Date(
                  assetDetails.lastMaintenanceDate
                ).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Next Scheduled Maintenance:</span>{" "}
              <span className="text-gray-800">
                {new Date(
                  assetDetails.nextScheduledMaintenance
                ).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-gray-800">{assetDetails.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span>{" "}
              <span className="text-gray-800">{assetDetails.location}</span>
            </p>
          </div>
        </div>
      )}
      {performanceData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
          <Line data={performanceData} />
        </div>
      )}
    </div>
  );
};

export default AssetPerformance;
