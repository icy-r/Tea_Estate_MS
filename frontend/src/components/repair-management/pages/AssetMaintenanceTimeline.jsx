import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../../../services/axios.js";

const AssetMaintenanceTimeline = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get("/maintenances");
        const data = processMaintenanceData(response.data);
        setMaintenanceData(data);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  const processMaintenanceData = (rawData) => {
    // Process the raw data to create a timeline
    // This is a simplified example; you'd need to adjust based on your actual data structure
    const timeline = rawData.reduce((acc, maintenance) => {
      const date = new Date(maintenance.scheduledDate)
        .toISOString()
        .split("T")[0];
      if (!acc[date]) {
        acc[date] = { date, count: 0 };
      }
      acc[date].count++;
      return acc;
    }, {});

    return Object.values(timeline).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Asset Maintenance Timeline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={maintenanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetMaintenanceTimeline;
