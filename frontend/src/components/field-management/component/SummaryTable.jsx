import React, { useState } from "react";
import axios from "../../../services/axios.js";
import Notification from "./NotificationContent"; // Import the Notification component

const SummaryTable = ({ summaryData }) => {
  // States to manage notification visibility, message, and severity
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // Function to handle notification close
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleUpdateHarvestLog = async () => {
    try {
      const logData = {
        date: new Date(),
        logs: summaryData,
      };
      await axios.post("/harvestlogs", logData); // POST request to save the log

      // Show success notification
      setNotificationMessage("Harvest log successfully updated!");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating harvest log:", error);

      // Show error notification
      setNotificationMessage("Error updating harvest log.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-gray-100">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="py-2 px-4 text-left">Field</th>
            <th className="py-2 px-4 text-left">Best Quality</th>
            <th className="py-2 px-4 text-left">Good Quality</th>
            <th className="py-2 px-4 text-left">Poor Quality</th>
            <th className="py-2 px-4 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.length > 0 ? (
            summaryData.map((summary) => (
              <tr key={summary.fieldName} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{summary.fieldName}</td>
                <td className="py-2 px-4 border">{summary.totalBest} kg</td>
                <td className="py-2 px-4 border">{summary.totalGood} kg</td>
                <td className="py-2 px-4 border">{summary.totalDamaged} kg</td>
                <td className="py-2 px-4 border">{summary.totalAll} kg</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No summary data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Harvest Log Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleUpdateHarvestLog}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Update Harvest Log
        </button>
      </div>

      {/* Notification for success/error */}
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        message={notificationMessage}
        severity={notificationSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default SummaryTable;
