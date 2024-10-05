import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ViewHarvest = () => {
  const [harvests, setHarvests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabor, setSelectedLabor] = useState("all");
  const [selectedField, setSelectedField] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  // Fetch harvest data from the collection
  const fetchHarvests = async () => {
    try {
      const response = await axios.get("/harvests/");
      setHarvests(response.data);
    } catch (error) {
      console.error("Error fetching harvests data:", error);
    }
  };

  useEffect(() => {
    fetchHarvests();
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Daily Harvest Information", 10, 10);
    let bodydata;
    if (selectedField === "all" && selectedLabor === "all") {
      bodydata = harvests.map((harvest) => [
        harvest.labour_name,
        harvest.field_name,
        new Date(harvest.date).toLocaleDateString(),
        harvest.best_qnty,
        harvest.good_qnty,
        harvest.damaged_qnty,
        harvest.total,
      ]);
    } else if (selectedLabor !== "all") {
      bodydata = harvests
        .filter((harvest) => harvest.labour_name === selectedLabor)
        .map((harvest) => [
          harvest.labour_name,
          harvest.field_name,
          new Date(harvest.date).toLocaleDateString(),
          harvest.best_qnty,
          harvest.good_qnty,
          harvest.damaged_qnty,
          harvest.total,
        ]);
    } else {
      bodydata = harvests
        .filter((harvest) => harvest.field_name === selectedField)
        .map((harvest) => [
          harvest.labour_name,
          harvest.field_name,
          new Date(harvest.date).toLocaleDateString(),
          harvest.best_qnty,
          harvest.good_qnty,
          harvest.damaged_qnty,
          harvest.total,
        ]);
    }
    doc.autoTable({
      head: [
        [
          "Labour",
          "Field",
          "Date",
          "Best Quality",
          "Good Quality",
          "Poor Quality",
          "Total",
        ],
      ],
      body: bodydata,
    });
    doc.save("daily-harvest.pdf");
  };

  // Filtered data based on search term, selected labor, and field
  const filteredHarvests = harvests.filter((harvest) => {
    const matchesSearch =
      harvest.labour_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      harvest.field_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLabor =
      selectedLabor === "all" || harvest.labour_name === selectedLabor;
    const matchesField =
      selectedField === "all" || harvest.field_name === selectedField;

    return matchesSearch && matchesLabor && matchesField;
  });

  // Unique list of labors and fields for filter options
  const laborOptions = [...new Set(harvests.map((h) => h.labour_name))];
  const fieldOptions = [...new Set(harvests.map((h) => h.field_name))];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Daily Harvest Information</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by labour or field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-10 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
          >
            Filters
          </button>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLabor("all");
              setSelectedField("all");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
          >
            <MdClear className="mr-2" /> Clear
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Print Document
        </button>
      </div>

      {filterOpen && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          <div className="flex space-x-4">
            <select
              value={selectedLabor}
              onChange={(e) => setSelectedLabor(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Labors</option>
              {laborOptions.map((labor) => (
                <option key={labor} value={labor}>
                  {labor}
                </option>
              ))}
            </select>

            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Fields</option>
              {fieldOptions.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Labour</th>
              <th className="py-2 px-4 text-left">Field</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Best Quality</th>
              <th className="py-2 px-4 text-left">Good Quality</th>
              <th className="py-2 px-4 text-left">Poor Quality</th>
              <th className="py-2 px-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredHarvests.length > 0 ? (
              filteredHarvests.map((harvest) => (
                <tr key={harvest.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{harvest.labour_name}</td>
                  <td className="py-2 px-4 border">{harvest.field_name}</td>
                  <td className="py-2 px-4 border">
                    {new Date(harvest.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{harvest.best_qnty} kg</td>
                  <td className="py-2 px-4 border">{harvest.good_qnty} kg</td>
                  <td className="py-2 px-4 border">
                    {harvest.damaged_qnty} kg
                  </td>
                  <td className="py-2 px-4 border">{harvest.total} kg</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No harvest records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHarvest;
