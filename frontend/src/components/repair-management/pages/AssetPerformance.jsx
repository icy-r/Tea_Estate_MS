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
      setPerformanceData(response.data);
    } catch (error) {
      console.error("Error fetching asset performance:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Performance Tracking</h1>
      <select
        onChange={(e) => {
          setSelectedAsset(e.target.value);
          fetchAssetPerformance(e.target.value);
        }}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select an asset</option>
        {assets.map((asset) => (
          <option key={asset._id} value={asset._id}>
            {asset.name}
          </option>
        ))}
      </select>
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
