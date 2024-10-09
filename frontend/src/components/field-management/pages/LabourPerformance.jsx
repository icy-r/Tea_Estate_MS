import React, { useState, useEffect } from "react";
import { Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "../../../services/axios.js"; // Using your axios configuration

const LabourList = () => {
  const [labours, setLabours] = useState([]);
  const [openRows, setOpenRows] = useState({}); // Store open/closed state for each row

  const fetchLabours = async () => {
    try {
      const response = await axios.get("/labours/");
      const labourList = Array.isArray(response.data) ? response.data : [];
      const filteredLabours = labourList.filter(
        (labour) => labour.role === "Labour"
      );
      setLabours(filteredLabours);
    } catch (error) {
      console.error("Error fetching labours data:", error);
      setLabours([]); // Ensure labours is an array even if there's an error
    }
  };

  useEffect(() => {
    fetchLabours(); // Fetch data on component load
  }, []);

  const toggleRow = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Labour List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labours.length > 0 ? (
              labours.map((labour) => (
                <React.Fragment key={labour.id}>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{labour.id}</td>
                    <td className="py-2 px-4 border">{labour.firstName}</td>
                    <td className="py-2 px-4 border">{labour.lastName}</td>
                    <td className="py-2 px-4 border">{labour.role}</td>
                    <td className="py-2 px-4 border text-center">
                      <IconButton onClick={() => toggleRow(labour.id)}>
                        {openRows[labour.id] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} style={{ padding: 0 }}>
                      <Collapse
                        in={openRows[labour.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="p-4">
                          <p>
                            <strong>Harvest Quantity:</strong>{" "}
                            {labour.harvest_qnty}
                          </p>
                          <p>
                            <strong>Best Quantity:</strong> {labour.best_qnty}
                          </p>
                          <p>
                            <strong>Good Quantity:</strong> {labour.good_qnty}
                          </p>
                          <p>
                            <strong>Damaged Quantity:</strong>{" "}
                            {labour.damaged_qnty}
                          </p>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No labours available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabourList;
