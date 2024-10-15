import React, { useState, useEffect } from "react";
import axios from "../../../services/axios.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Status from "../../divs/Status.jsx";

const basicHeaderItems = [
  "Request Number",
  "Status",
  "Asset",
  "Created At",
  "Description",
  "Priority",
  "Assigned Technician",
];

const ViewReports = () => {
  const [data, setData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const navigate = useNavigate();

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Maintenance Reports", 10, 10);
    let bodyData = data
      .filter((item) => statusFilter === "all" || item.status === statusFilter)
      .map((item) => [
        item.requestNumber,
        item.asset.assetName,
        new Date(item.createdAt).toLocaleDateString(),
        item.description,
        item.priority,
        item.assignedTo.name,
        item.status,
      ]);

    doc.autoTable({
      head: [basicHeaderItems],
      body: bodyData,
    });
    doc.save("maintenance_report.pdf");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("/requestmaintenance")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleDateString(),
        }));
        setData(formattedData);
        const availableStatuses = [
          ...new Set(formattedData.map((item) => item.status)),
        ];
        setStatusOptions(["all", ...availableStatuses]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleEdit = (item) => {
    console.log(item);
    navigate(`/admin/repair/editmaintenancerequest/${item}`);
  };

  const handleDelete = (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`/requestMaintenance/${requestId}`)
        .then(() => {
          setData(data.filter((item) => item._id !== requestId));
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
          alert("Failed to delete the request. Please try again.");
        });
    }
  };

  const itemsPerPage = 10;
  const filteredData = data.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (statusFilter === "all" || item.status === statusFilter)
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          Maintenance Requests
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
          <button
            onClick={() => navigate("/admin/repair/reqmaintenance")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            New Request
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handlePrint}
          >
            Print Report
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="relative flex-grow mb-2 sm:mb-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
            >
              <MdClear className="mr-2" /> Clear
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center p-5">
          <div className="loader JS_on">
            <span className="binary"></span>
            <span className="binary"></span>
            <span className="getting-there">LOADING STUFF...</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-color_extra text-white">
              <tr>
                {basicHeaderItems.map((item, index) => (
                  <th key={index} className="py-3 px-4 text-left">
                    {item}
                  </th>
                ))}
                <th className="py-3 px-4 text-left sticky right-0 bg-color_button text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr
                  key={item.requestNumber}
                  className="hover:bg-white_modified transition duration-300 text-black dark:bg-gray-800 dark:text-white hover:text-black"
                >
                  <td className="py-3 px-4">{item.requestNumber}</td>
                  <td className="py-3 px-4">{item.status}</td>
                  <td className="py-3 px-4">{item.asset.assetName}</td>
                  <td className="py-3 px-4">{item.createdAt}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4">{item.priority}</td>
                  <td className="py-3 px-4">{item.assignedTo.name}</td>
                  <td className="py-3 px-4 sticky flex right-0 backdrop-blur space-x-2  bg-color_extra">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} results
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;
