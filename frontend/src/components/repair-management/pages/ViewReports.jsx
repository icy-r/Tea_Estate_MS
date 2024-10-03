import jsPDF from "jspdf";
import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import {
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Form from "../components/Form.jsx";
import Status from "../../divs/Status.jsx";
import { MenuItem, Select } from "@mui/material";
import formdataentry from "../data-files/form-entry-data-report.js";

const basicHeaderItems = [
  "Request ID",
  "Status",
  "Item ID",
  "Request Date",
  "Issue Description",
  "Priority Level",
  "Assigned Technician ID",
];

//view available reported reports
const ViewReports = () => {
  const [data, setData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreate, setIsCreate] = useState(false);
  const [formRow, setFormRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Report's report", 10, 10);
    let bodyData;
    if (statusFilter === "all") {
      bodyData = data.map((item) => [
        item.request_id,
        item.item_id,
        item.request_date,
        item.issue_description,
        item.priority_level,
        item.assigned_technician_id,
        item.status,
      ]);
    } else {
      bodyData = data
        .filter((item) => item.status === statusFilter)
        .map((item) => [
          item.request_id,
          item.item_id,
          item.request_date,
          item.issue_description,
          item.priority_level,
          item.assigned_technician_id,
          item.status,
        ]);
    }

    doc.autoTable({
      head: [
        [
          "Request ID",
          "Item ID",
          "Request Date",
          "Issue Description",
          "Priority Level",
          "Assigned Technician ID",
          "Status",
        ],
      ],
      body: bodyData,
    });
    doc.save("report.pdf");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/repairs/")
      .then((response) => {
        //convert the date to a more readable format in response.request_date
        response.data.forEach((item) => {
          item.request_date = new Date(item.request_date).toLocaleDateString();
        });
        setData(response.data);
        const availableStatuses = [
          ...new Set(response.data.map((item) => item.status)),
        ];
        setStatusOptions(["all", ...availableStatuses]);
      })
      .catch((error) => alert(error));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [isCreate]);

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

  const handleDelete = (request_id) => {
    axios
      .delete(`/repairs/${request_id}`)
      .then(() =>
        setData(data.filter((item) => item.request_id !== request_id))
      )
      .catch((error) => alert(error));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {isCreate && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
          >
            <Form
              setIsCreate={setIsCreate}
              dataOld={formRow}
              setFormRow={setFormRow}
              model={"repairs"}
              formEntryData={formdataentry}
            />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Report Management</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <FaFilter className="mr-2" /> Filters
          </button>
          <button
            onClick={() => setIsCreate(!isCreate)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add Report
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handlePrint}
          >
            Print Data
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

      {loading && (
        <div className="flex justify-center items-center p-5">
          <div className="loader JS_on">
            <span className="binary"></span>
            <span className="binary"></span>
            <span className="getting-there">LOADING STUFF...</span>
          </div>
        </div>
      )}

      {!isCreate && !loading && (
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
                  key={item.request_id}
                  className="hover:bg-white_modified transition duration-300 text-black dark:bg-gray-800 dark:text-white hover:text-black"
                >
                  <td className="py-3 px-4">{item.request_id}</td>
                  <td className="py-3 px-4">{item.status}</td>
                  <td className="py-3 px-4">{item.item_id}</td>
                  <td className="py-3 px-4">{item.request_date}</td>
                  <td className="py-3 px-4">{item.issue_description}</td>
                  <td className="py-3 px-4">{item.priority_level}</td>
                  <td className="py-3 px-4">{item.assigned_technician_id}</td>
                  <td className="py-3 px-4 sticky flex right-0 backdrop-blur space-x-2  bg-color_extra">
                    <button
                      onClick={() => {
                        setIsCreate(true);
                        setFormRow(item);
                      }}
                      className=" bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.request_id)}
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

      {!isCreate && (
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
      )}
    </div>
  );
};

export default ViewReports;