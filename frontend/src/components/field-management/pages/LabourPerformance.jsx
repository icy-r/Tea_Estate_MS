import React, { useState, useEffect, useMemo } from "react";
import { Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Pie, Line } from "react-chartjs-2";
import axios from "../../../services/axios.js";

const LabourList = () => {
  const [labours, setLabours] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [sortBy, setSortBy] = useState("harvest_qnty");
  const [harvestData, setHarvestData] = useState({});

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
      setLabours([]);
    }
  };

  useEffect(() => {
    fetchLabours();
  }, []);

  const toggleRow = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!openRows[id]) {
      fetchHarvestData(id);
    }
  };

  const fetchHarvestData = async (labourId) => {
    try {
      const response = await axios.get(`/harvests?labour_id=${labourId}`);
      const data = response.data.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
        }),
        total: entry.total,
      }));
      setHarvestData((prev) => ({
        ...prev,
        [labourId]: data,
      }));
    } catch (error) {
      console.error("Error fetching harvest data:", error);
    }
  };

  const sortedLabours = useMemo(() => {
    return [...labours].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [labours, sortBy]);

  const calculatePerformanceMetrics = (labour) => {
    const totalQuantity =
      labour.best_qnty + labour.good_qnty + labour.damaged_qnty;
    const bestQualityRatio = totalQuantity
      ? (labour.best_qnty / totalQuantity) * 100
      : 0;

    return {
      totalQuantity,
      bestQualityRatio: bestQualityRatio.toFixed(2),
    };
  };

  const preparePieData = (labour) => {
    const { best_qnty, good_qnty, damaged_qnty } = labour;
    const totalQuantity = best_qnty + good_qnty + damaged_qnty;

    return {
      labels: ["Best Quality", "Good Quality", "Damaged Quality"],
      datasets: [
        {
          label: "Quality Distribution",
          data: [
            (best_qnty / totalQuantity) * 100 || 0,
            (good_qnty / totalQuantity) * 100 || 0,
            (damaged_qnty / totalQuantity) * 100 || 0,
          ],
          backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"],
          hoverOffset: 4,
        },
      ],
    };
  };

  const prepareLineData = (labourId) => {
    const labourHarvestData = harvestData[labourId] || [];
    return {
      labels: labourHarvestData.map((entry) => entry.date),
      datasets: [
        {
          label: "Daily Harvest (kg)",
          data: labourHarvestData.map((entry) => entry.total),
          fill: false,
          borderColor: "#42A5F5",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Labour Performance</h1>

      <div className="mb-4">
        <label className="mr-2">Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="harvest_qnty">Harvest Quantity</option>
          <option value="best_qnty">Best Quantity</option>
          <option value="good_qnty">Good Quantity</option>
          <option value="damaged_qnty">Damaged Quantity</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Total Harvest (kg)</th>
              <th className="py-2 px-4 text-left">Best Quality (%)</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLabours.length > 0 ? (
              sortedLabours.map((labour) => {
                const { totalQuantity, bestQualityRatio } =
                  calculatePerformanceMetrics(labour);

                return (
                  <React.Fragment key={labour.id}>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{labour.id}</td>
                      <td className="py-2 px-4 border">{labour.firstName}</td>
                      <td className="py-2 px-4 border">{labour.lastName}</td>
                      <td className="py-2 px-4 border">{totalQuantity} kg</td>
                      <td className="py-2 px-4 border">{bestQualityRatio} %</td>
                      <td className="py-2 px-4 border text-center">
                        <IconButton onClick={() => toggleRow(labour.id)}>
                          {openRows[labour.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <Collapse
                          in={openRows[labour.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <div className="p-4 flex flex-col md:flex-row justify-between">
                            <div className="flex-1 mb-4 md:mr-4">
                              <h3 className="text-lg font-semibold mb-2">
                                Labour Details
                              </h3>
                              <p>
                                <strong>Harvest Quantity:</strong>{" "}
                                {labour.harvest_qnty} kg
                              </p>
                              <p>
                                <strong>Best Quantity:</strong>{" "}
                                {labour.best_qnty} kg
                              </p>
                              <p>
                                <strong>Good Quantity:</strong>{" "}
                                {labour.good_qnty} kg
                              </p>
                              <p>
                                <strong>Damaged Quantity:</strong>{" "}
                                {labour.damaged_qnty} kg
                              </p>
                            </div>

                            {/* Pie Chart for quality distribution */}
                            <div
                              className="flex-1 mb-4"
                              style={{ width: "300px", height: "300px" }}
                            >
                              <h3 className="text-lg font-semibold mb-2">
                                Quality Distribution
                              </h3>
                              <Pie
                                data={preparePieData(labour)}
                                width={300}
                                height={300}
                                key={labour.id}
                              />
                            </div>

                            {/* Line Chart for daily harvest trends */}
                            <div
                              className="flex-1 mb-4"
                              style={{ width: "300px", height: "300px" }}
                            >
                              <h3 className="text-lg font-semibold mb-2">
                                Harvest Trend (Daily)
                              </h3>
                              <Line
                                data={prepareLineData(labour.id)}
                                width={300}
                                height={300}
                                key={labour.id}
                              />
                            </div>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
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
