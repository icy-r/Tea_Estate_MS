import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const FertilizerLog = ({ onBack }) => {
  const [fertilizerLogs, setFertilizerLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [fertilizerTypeFilter, setFertilizerTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");

  // New state for dropdown options
  const [fertilizerTypes, setFertilizerTypes] = useState([]);
  const [fields, setFields] = useState([]);

  const fetchFertilizerLogs = async () => {
    try {
      const response = await axios.get("/fertilizerlogs");
      const logs = response.data.logs || [];
      setFertilizerLogs(logs);
      setFilteredLogs(logs);

      // Extract unique fertilizer types and fields
      const uniqueFertilizerTypes = [
        ...new Set(logs.map((log) => log.fertilizerType)),
      ];
      const uniqueFields = [...new Set(logs.map((log) => log.fieldApplied))];

      setFertilizerTypes(uniqueFertilizerTypes.sort());
      setFields(uniqueFields.sort());
    } catch (error) {
      console.error("Error fetching fertilizer logs:", error);
    }
  };

  useEffect(() => {
    fetchFertilizerLogs();
  }, []);

  useEffect(() => {
    let filtered = fertilizerLogs;

    if (fertilizerTypeFilter) {
      filtered = filtered.filter(
        (log) => log.fertilizerType === fertilizerTypeFilter
      );
    }

    if (dateFilter) {
      const date = new Date(dateFilter).toLocaleDateString();
      filtered = filtered.filter(
        (log) => new Date(log.dateApplied).toLocaleDateString() === date
      );
    }

    if (fieldFilter) {
      filtered = filtered.filter((log) => log.fieldApplied === fieldFilter);
    }

    setFilteredLogs(filtered);
  }, [fertilizerTypeFilter, dateFilter, fieldFilter, fertilizerLogs]);

  const handlePrint = () => {
    const doc = new jsPDF();

    // Add title and date
    doc.text("Fertilizer Application Log", 10, 10);
    const currentDate = format(new Date(), "dd-MM-yyyy");
    doc.text(`Generated on: ${currentDate}`, 130, 10);

    // Add filter information if any filters are active
    let yPos = 20;
    if (fertilizerTypeFilter || dateFilter || fieldFilter) {
      doc.text("Applied Filters:", 10, yPos);
      yPos += 7;

      if (fertilizerTypeFilter) {
        doc.text(`Fertilizer Type: ${fertilizerTypeFilter}`, 15, yPos);
        yPos += 7;
      }
      if (dateFilter) {
        doc.text(
          `Date: ${new Date(dateFilter).toLocaleDateString()}`,
          15,
          yPos
        );
        yPos += 7;
      }
      if (fieldFilter) {
        doc.text(`Field: ${fieldFilter}`, 15, yPos);
        yPos += 7;
      }
    }

    // Calculate total amount of fertilizer used
    const totalAmount = filteredLogs.reduce((sum, log) => sum + log.amount, 0);

    // Create summary section
    //doc.text(`Total Fertilizer Used: ${totalAmount} kg`, 10, yPos + 5);

    // Create table data
    const tableData = filteredLogs.map((log) => [
      new Date(log.dateApplied).toLocaleDateString(),
      log.fertilizerType,
      `${log.amount} kg`,
      log.fieldApplied,
    ]);

    // Add table to document
    doc.autoTable({
      startY: yPos + 15,
      head: [["Date Applied", "Fertilizer Type", "Amount", "Field Applied"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 150, 136] },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      margin: { top: 15 },
    });

    // Save the PDF
    doc.save("fertilizer-log.pdf");
  };

  const handleClearFilters = () => {
    setFertilizerTypeFilter("");
    setDateFilter("");
    setFieldFilter("");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Fertilizer Log</h1>
        <div className="space-x-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Print Document
          </button>
          <button
            onClick={onBack}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Fertilizer Type</InputLabel>
          <Select
            value={fertilizerTypeFilter}
            onChange={(e) => setFertilizerTypeFilter(e.target.value)}
            label="Fertilizer Type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {fertilizerTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Field</InputLabel>
          <Select
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
            label="Field"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="primary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
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