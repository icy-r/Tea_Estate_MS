import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import SummaryTable from "../component/SummaryTable.jsx"; // Import SummaryTable

const ViewHarvest = () => {
  const [harvests, setHarvests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabor, setSelectedLabor] = useState("all");
  const [selectedField, setSelectedField] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [fields, setFields] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch harvest data from the collection
  const fetchHarvests = async () => {
    try {
      const response = await axios.get("/harvests/");
      setHarvests(response.data);
    } catch (error) {
      console.error("Error fetching harvests data:", error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await axios.get("/fields/");
      setFields(response.data);
    } catch (error) {
      console.error("Error fetching fields data:", error);
    }
  };

  useEffect(() => {
    fetchHarvests();
    fetchFields();
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Daily Harvest Information", 10, 10);
    const currentDate = format(new Date(), "dd-MM-yyyy");
    doc.text(`Date: ${currentDate}`, 150, 10);
    let bodydata;

    if (showSummary) {
      // Create summary data for printing
      const summaryData = calculateSummary();
      bodydata = summaryData.map((summary) => [
        summary.fieldName,
        summary.totalBest,
        summary.totalGood,
        summary.totalDamaged,
        summary.totalAll,
      ]);

      doc.autoTable({
        head: [
          ["Field", "Best Quality", "Good Quality", "Poor Quality", "Total"],
        ],
        body: bodydata,
      });
    } else {
      // Create harvest data for printing
      bodydata = filteredHarvests.map((harvest) => [
        harvest.labour_name,
        harvest.field_name,
        new Date(harvest.date).toLocaleDateString(),
        harvest.best_qnty,
        harvest.good_qnty,
        harvest.damaged_qnty,
        harvest.total,
      ]);

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
    }

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

  // Sort filtered data by date in descending order
  const sortedFilteredHarvests = filteredHarvests.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Pagination logic
  const pageCount = Math.ceil(sortedFilteredHarvests.length / itemsPerPage);
  const paginatedHarvests = sortedFilteredHarvests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Unique list of labors and fields for filter options
  const laborOptions = [...new Set(harvests.map((h) => h.labour_name))];
  const fieldOptions = [...new Set(harvests.map((h) => h.field_name))];

  // Handle Summary Calculation for today's date
  const calculateSummary = () => {
    const today = new Date().toLocaleDateString("en-CA");
    const todayHarvests = harvests.filter(
      (harvest) => new Date(harvest.date).toLocaleDateString("en-CA") === today
    );

    const summary = fields.map((field) => {
      const fieldHarvests = todayHarvests.filter(
        (harvest) => harvest.field_name === field.name
      );

      const totalBest = fieldHarvests.reduce(
        (acc, curr) => acc + curr.best_qnty,
        0
      );
      const totalGood = fieldHarvests.reduce(
        (acc, curr) => acc + curr.good_qnty,
        0
      );
      const totalDamaged = fieldHarvests.reduce(
        (acc, curr) => acc + curr.damaged_qnty,
        0
      );
      const totalAll = fieldHarvests.reduce((acc, curr) => acc + curr.total, 0);

      return {
        fieldName: field.name,
        totalBest,
        totalGood,
        totalDamaged,
        totalAll,
      };
    });

    return summary;
  };

  const summaryData = calculateSummary();

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

        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Print Document
          </button>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>
        </div>
      </div>

      {/* Conditionally render the filters */}
      {!showSummary && filterOpen && (
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

      {/* Conditionally render the tables */}
      {showSummary ? (
        <SummaryTable summaryData={summaryData} />
      ) : (
        <div>
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
                {paginatedHarvests.length > 0 ? (
                  paginatedHarvests.map((harvest) => (
                    <tr key={harvest.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">
                        {harvest.labour_name}
                      </td>
                      <td className="py-2 px-4 border">{harvest.field_name}</td>
                      <td className="py-2 px-4 border">
                        {new Date(harvest.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border">
                        {harvest.best_qnty} kg
                      </td>
                      <td className="py-2 px-4 border">
                        {harvest.good_qnty} kg
                      </td>
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

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHarvest;
