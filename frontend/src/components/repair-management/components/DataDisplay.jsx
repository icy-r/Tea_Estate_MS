import {useEffect, useState} from 'react';
import axios from "../../../services/axios.js";
import {FaChevronLeft, FaChevronRight, FaFilter, FaSearch} from 'react-icons/fa';
import {MdClear} from 'react-icons/md';
import Status from "../../divs/Status.jsx";
import Form from "./Form.jsx";
import { AnimatePresence, motion } from "framer-motion";
import "../../../constants/loadding.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import formEntryData from "../data-files/form-entry-data.js";
import originalAxios from "axios";

const basicHeaderItems = [
  "Machine ID",
  "Status",
  "Machine Name",
  "Machine Type",
  "Driver ID",
  "Registration Number",
];

const user = {
  email: "asath12882@gmail.com",
};

const DataManagementComponent = () => {
  const [data, setData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreate, setIsCreate] = useState(false);
  const [formRow, setFormRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [email, setEmail] = useState("");

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Machine Management", 10, 10);
    let bodyData;
    if (statusFilter === "all") {
      bodyData = data.map((item) => [
        item.item_id,
        item.m_status,
        item.name,
        item.type,
        item.driver_id,
        item.registration_number,
      ]);
    } else {
      bodyData = data
        .filter((item) => item.m_status === statusFilter)
        .map((item) => [
          item.item_id,
          item.m_status,
          item.name,
          item.type,
          item.driver_id,
          item.registration_number,
        ]);
    }

    doc.autoTable({
      head: [basicHeaderItems],
      body: bodyData,
    });
    doc.save("MachineManagement.pdf");
  };

  const handleEmail = () => {
    const emailData = data.map((item) => [
      item.item_id,
      item.m_status,
      item.name,
      item.type,
      item.driver_id,
      item.registration_number,
    ]);

    //axios call to send email
    originalAxios
      .post("http://localhost:3001/send-email", {
        to: user.email,
        subject: "Machine Management Report",
        //emailData to single string format
        text: emailData.map((item) => item.join(" ")).join("\n"),
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Email sent successfully");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/machines/")
      .then((response) => {
        setData(response.data);
        const availableStatuses = [
          ...new Set(response.data.map((item) => item.m_status)),
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
      (statusFilter === "all" || item.m_status === statusFilter)
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    //reset the form and rerender the component
    if (!isCreate) {
      setFormRow({});
    }
  }, [isCreate]);

  const handleDelete = (item_id) => {
    axios
      .delete(`/machines/${item_id}`)
      .then(() => setData(data.filter((item) => item.item_id !== item_id)))
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
              model={"machines"}
              formEntryData={formEntryData}
            />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Machine Management</h1>
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
            Add Machine
          </button>
          {/* print only data with specific defined format */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handlePrint}
          >
            Print Data
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleEmail}
          >
            Email Data
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
                  key={item.item_id}
                  className="hover:bg-white_modified transition duration-300 text-black dark:bg-gray-800 dark:text-white hover:text-black"
                >
                  <td className="py-3 px-4">{item.item_id}</td>
                  <td className="py-3 px-4">
                    <Status value={item.m_status} />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.type}</td>
                  <td className="py-3 px-4">{item.driver_id}</td>
                  <td className="py-3 px-4">{item.registration_number}</td>
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
                      onClick={() => handleDelete(item.item_id)}
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

export default DataManagementComponent;