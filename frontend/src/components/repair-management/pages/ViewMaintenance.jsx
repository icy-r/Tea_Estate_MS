import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdClear } from "react-icons/md";
import EditMaintenance from "./EditMaintenance.jsx";

const MaintenanceReportGenerator = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [assetDetails, setAssetDetails] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(true);
  const [editingMaintenanceId, setEditingMaintenanceId] = useState(null);

  useEffect(() => {
    fetchMaintenanceTasks();
  }, []);

  const fetchMaintenanceTasks = () => {
    setLoading(true);
    axios
      .get("/maintenances")
      .then((response) => {
        setMaintenanceTasks(response.data);
        fetchAssetDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching maintenance tasks:", error);
      })
      .finally(() => setLoading(false));
  };

  const fetchAssetDetails = (tasks) => {
    const assetIds = [...new Set(tasks.map((task) => task.assetId))];
    assetIds.forEach((assetId) => {
      axios
        .get(`/assets/${assetId}`)
        .then((response) => {
          setAssetDetails((prevDetails) => ({
            ...prevDetails,
            [assetId]: response.data,
          }));
        })
        .catch((error) => {
          console.error(
            `Error fetching asset details for ID ${assetId}:`,
            error
          );
        });
    });
  };

  const filteredTasks = maintenanceTasks.filter((task) => {
    const asset = assetDetails[task.assetId] || {};
    const matchesSearch =
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedTechnician &&
        task.assignedTechnician.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      asset.assetNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesDate =
      (!dateFilter.start ||
        new Date(task.scheduledDate) >= new Date(dateFilter.start)) &&
      (!dateFilter.end ||
        new Date(task.scheduledDate) <= new Date(dateFilter.end));
    return matchesSearch && matchesStatus && matchesDate;
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Maintenance Report", 14, 15);

    const tableData = filteredTasks.map((task) => {
      const asset = assetDetails[task.assetId] || {};
      return [
        asset.assetNumber || "N/A",
        new Date(task.scheduledDate).toLocaleDateString(),
        task.maintenanceType,
        task.description,
        task.assignedTechnician ? task.assignedTechnician.name : "N/A",
        task.status,
        task.completionDate
          ? new Date(task.completionDate).toLocaleDateString()
          : "N/A",
      ];
    });

    doc.autoTable({
      head: [
        [
          "Asset Number",
          "Scheduled Date",
          "Type",
          "Description",
          "Technician",
          "Status",
          "Completion Date",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("maintenance_report.pdf");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          Maintenance Report Generator
        </h1>
        {editingMaintenanceId && (
          <EditMaintenance
            maintenanceId={editingMaintenanceId}
            onClose={() => {
              setEditingMaintenanceId(null);
              fetchMaintenanceTasks(); // Refresh the list after editing
            }}
          />
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-700 flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-700"
            onClick={generatePDF}
          >
            Generate PDF Report
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
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={dateFilter.start}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, start: e.target.value })
              }
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={dateFilter.end}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, end: e.target.value })
              }
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateFilter({ start: "", end: "" });
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-700 flex items-center"
            >
              <MdClear className="mr-2" /> Clear
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center p-5">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Asset Number</th>
                <th className="py-3 px-4 text-left">Scheduled Date</th>
                <th className="py-3 px-4 text-left">Maintenance Type</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Technician Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Completion Date</th>
                <th className="py-3 px-4 text-left sticky right-0 bg-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedTasks.map((task, index) => {
                const asset = assetDetails[task.assetId] || {};
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 hover:text-black hover:shadow-md transition duration-200"
                  >
                    <td className="py-3 px-4">
                      {asset.assetNumber || "Loading..."}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(task.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{task.maintenanceType}</td>
                    <td className="py-3 px-4">{task.description}</td>
                    <td className="py-3 px-4">
                      {task.assignedTechnician
                        ? task.assignedTechnician.name
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">{task.status}</td>
                    <td className="py-3 px-4">
                      {task.completionDate
                        ? new Date(task.completionDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingMaintenanceId(task._id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            axios
                              .delete(`/maintenances/${task._id}`)
                              .then(() => fetchMaintenanceTasks());
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of{" "}
          {filteredTasks.length} results
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition duration-700"
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition duration-700"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceReportGenerator;