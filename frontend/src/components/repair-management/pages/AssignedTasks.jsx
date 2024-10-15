import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import {
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
} from "react-icons/fa";
import { MdClear } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const EnhancedAssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, schedulesResponse] = await Promise.all([
          axios.get("technicians/requests"),
          axios.get("/technicians/schedules"),
        ]);

        const requests = requestsResponse.data.map((request) => ({
          ...request,
          taskType: "request",
          date: request.createdAt,
        }));

        const schedules = schedulesResponse.data.map((schedule) => ({
          ...schedule,
          taskType: "schedule",
          date: schedule.scheduledDate,
        }));

        const combinedTasks = [...requests, ...schedules];

        // Fetch asset details for each task
        const tasksWithAssets = await Promise.all(
          combinedTasks.map(async (task) => {
            if (task.assetId) {
              try {
                const assetResponse = await axios.get(
                  `/assets/${task.assetId}`
                );
                console.log("Fetched asset:", assetResponse.data);
                return { ...task, assetNumber: assetResponse.data.name };
              } catch (error) {
                console.error(`Error fetching asset ${task.assetId}`, error);
                return task;
              }
            }
            return task;
          })
        );

        setTasks(tasksWithAssets);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = () => {
    const assetDetails = tasks.reduce((acc, task) => {
      if (task.assetId) {
        acc[task.assetId] = task.assetNumber;
      }
      return acc;
    }, {});
    generatePDF();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Maintenance Report", 14, 15);

    const tableData = filteredTasks.map((task) => [
      task.assetNumber || "N/A",
      new Date(task.date).toLocaleDateString(),
      task.taskType === "request" ? "Request" : "Schedule",
      task.description,
      task.assignedTo?.name || task.assignedTechnician?.name || "N/A",
      task.status,
      task.completionDate
        ? new Date(task.completionDate).toLocaleDateString()
        : "N/A",
    ]);

    doc.autoTable({
      head: [
        [
          "Asset Number",
          "Date",
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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = Object.values(task).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = typeFilter === "all" || task.taskType === typeFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesDate =
      (!dateFilter.start ||
        new Date(task.date) >= new Date(dateFilter.start)) &&
      (!dateFilter.end || new Date(task.date) <= new Date(dateFilter.end));
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(sortedTasks.length / itemsPerPage);
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const updateStatus = (task) => {
    return async () => {
      const statusOptions = [
        "scheduled",
        "in-progress",
        "completed",
        "postponed",
      ];

      const newStatus = prompt(
        `Enter new status (${statusOptions.join(", ")}):`,
        task.status
      );

      if (!statusOptions.includes(newStatus)) {
        alert("Invalid status. Please enter a valid status.");
        return;
      }
      if (newStatus === task.status) {
        alert("New status cannot be the same as the current status.");
        return;
      }
      const completionNotes = prompt("Enter status notes:");
      if (completionNotes) {
        changeStatus(task, newStatus, completionNotes);
      } else {
        alert("notes are required.");
      }
    };
  };

  const changeStatus = async (task, newStatus, completionNotes) => {
    try {
      const endpoint =
        task.taskType === "request"
          ? `/technicians/requests/${task._id}`
          : `/technicians/schedules/${task._id}`;

      await axios.put(endpoint, {
        status: newStatus,
        completionNotes,
        completionDate: new Date().toISOString(),
      });

      const updatedTasks = tasks.map((t) =>
        t._id === task._id
          ? {
              ...t,
              status: newStatus,
              completionNotes,
              completionDate: new Date().toISOString(),
            }
          : t
      );
      setTasks(updatedTasks);

      toast.success(
        `Task ${task.requestNumber || task._id} status updated to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Assigned Tasks</h1>

      <div className="mb-4 flex justify-end items-center space-x-4">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <FaFilter className="mr-2" /> Filters
        </button>

        <button
          onClick={handleGenerateReport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center"
        >
          Generate Report
        </button>
      </div>

      {filterOpen && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="request">Requests</option>
              <option value="schedule">Schedules</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateFilter.start}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, start: e.target.value })
                }
                className="w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateFilter.end}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, end: e.target.value })
                }
                className="w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setStatusFilter("all");
              setDateFilter({ start: "", end: "" });
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 flex items-center"
          >
            <MdClear className="mr-2" /> Clear Filters
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">ID/Number</th>
              <th className="py-3 px-4 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center"
                >
                  Status <FaSort className="ml-1" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">Priority/Type</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Asset</th>
              <th className="py-3 px-4 text-left">
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center"
                >
                  Date <FaSort className="ml-1" />
                </button>
              </th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedTasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 hover:text-black">
                <td className="py-3 px-4">
                  {task.taskType === "request"
                    ? "Request/Repair"
                    : "Schedule/Maintenance"}
                </td>
                <td className="py-3 px-4">
                  {(task.requestNumber || task._id).slice(0, 5)}...
                </td>
                <td className="py-3 px-4">{task.status}</td>
                <td className="py-3 px-4">
                  {task.priority || task.maintenanceType}
                </td>
                <td className="py-3 px-4">{task.description}</td>
                <td className="py-3 px-4">
                  {task.assignedTo?.name || task.assignedTechnician?.name}
                </td>
                <td className="py-3 px-4">
                  {task.assetNumber || task.asset.assetName}
                </td>
                <td className="py-3 px-4">
                  {new Date(task.date).toLocaleDateString()}
                </td>
                <td className="py-3 flex gap-1 px-4">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={updateStatus(task)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition duration-300"
                  >
                    state
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedTasks.length)} of{" "}
          {sortedTasks.length} results
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
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
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="mt-4 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Task Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <strong className="text-gray-700">Type:</strong>
                <span className="text-gray-600">
                  {selectedTask.taskType === "request" ? "Request" : "Schedule"}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">ID/Number:</strong>
                <span className="text-gray-600">
                  {selectedTask.requestNumber || selectedTask._id}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Status:</strong>
                <span className="text-gray-600">{selectedTask.status}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Priority/Type:</strong>
                <span className="text-gray-600">
                  {selectedTask.priority || selectedTask.maintenanceType}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Description:</strong>
                <span className="text-gray-600">
                  {/* only show 10 characters */}
                  {selectedTask.description.length > 10
                    ? selectedTask.description.substring(0, 10) + "..."
                    : selectedTask.description}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Assigned To:</strong>
                <span className="text-gray-600">
                  {selectedTask.assignedTo?.name ||
                    selectedTask.assignedTechnician?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Asset:</strong>
                <span className="text-gray-600">
                  {selectedTask.assetNumber || selectedTask.assetId}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Date:</strong>
                <span className="text-gray-600">
                  {new Date(selectedTask.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAssignedTasks;