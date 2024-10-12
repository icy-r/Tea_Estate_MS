import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { Button, TextField } from "@mui/material";

const FertilizerLog = ({ onBack }) => {
  const [fertilizerLogs, setFertilizerLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [fertilizerTypeFilter, setFertilizerTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");

  // Fetch fertilizer logs
  const fetchFertilizerLogs = async () => {
    try {
      const response = await axios.get("/fertilizerlogs");
      const logs = response.data.logs || [];
      setFertilizerLogs(logs);
      setFilteredLogs(logs); // Initialize filtered logs
    } catch (error) {
      console.error("Error fetching fertilizer logs:", error);
    }
  };

  useEffect(() => {
    fetchFertilizerLogs();
  }, []);

  // Filter logs based on selected filters
  useEffect(() => {
    let filtered = fertilizerLogs;

    if (fertilizerTypeFilter) {
      filtered = filtered.filter((log) =>
        log.fertilizerType
          .toLowerCase()
          .includes(fertilizerTypeFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      const date = new Date(dateFilter).toLocaleDateString();
      filtered = filtered.filter(
        (log) => new Date(log.dateApplied).toLocaleDateString() === date
      );
    }

    if (fieldFilter) {
      filtered = filtered.filter((log) =>
        log.fieldApplied.toLowerCase().includes(fieldFilter.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [fertilizerTypeFilter, dateFilter, fieldFilter, fertilizerLogs]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Fertilizer Log</h1>
        <Button variant="contained" color="primary" onClick={onBack}>
          Back
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <TextField
          label="Fertilizer Type"
          variant="outlined"
          size="small"
          value={fertilizerTypeFilter}
          onChange={(e) => setFertilizerTypeFilter(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <TextField
          label="Field Applied"
          variant="outlined"
          size="small"
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Date Applied</th>
              <th className="py-2 px-4 text-left">Fertilizer Type</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Field Applied</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">
                    {new Date(log.dateApplied).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{log.fertilizerType}</td>
                  <td className="py-2 px-4 border">{log.amount} kg</td>
                  <td className="py-2 px-4 border">{log.fieldApplied}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No fertilizer logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FertilizerLog;
