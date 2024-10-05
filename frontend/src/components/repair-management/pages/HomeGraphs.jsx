import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axios from "../../../services/axios.js";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const CombinedDashboard = () => {
  const [machineData, setMachineData] = useState([]);
  const [repairData, setRepairData] = useState([]);

  useEffect(() => {
    axios
      .get("/machines")
      .then((response) => {
        setMachineData(response.data);
      })
      .catch((error) => console.error("Error fetching machine data:", error));

    axios
      .get("/repairs")
      .then((response) => {
        setRepairData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching repair request data:", error)
      );
  }, []);

  // Machine data processing
  const machineStatusData = machineData.reduce((acc, machine) => {
    acc[machine.m_status] = (acc[machine.m_status] || 0) + 1;
    return acc;
  }, {});

  const machinePieChartData = Object.keys(machineStatusData).map((status) => ({
    name: status,
    value: machineStatusData[status],
  }));

  const machineTypeData = machineData.reduce((acc, machine) => {
    acc[machine.type] = (acc[machine.type] || 0) + 1;
    return acc;
  }, {});

  const machineBarChartData = Object.keys(machineTypeData).map((type) => ({
    name: type,
    count: machineTypeData[type],
  }));

  // Repair request data processing
  const repairPriorityData = repairData.reduce((acc, request) => {
    acc[request.priority_level] = (acc[request.priority_level] || 0) + 1;
    return acc;
  }, {});

  const repairPieChartData = Object.keys(repairPriorityData).map(
    (priority) => ({
      name: priority,
      value: repairPriorityData[priority],
    })
  );

  const repairStatusData = repairData.reduce((acc, request) => {
    acc[request.status] = (acc[request.status] || 0) + 1;
    return acc;
  }, {});

  const repairBarChartData = Object.keys(repairStatusData).map((status) => ({
    name: status,
    count: repairStatusData[status],
  }));

  const repairTimelineData = repairData.reduce((acc, request) => {
    const date = new Date(request.request_date).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const repairLineChartData = Object.keys(repairTimelineData)
    .sort()
    .map((date) => ({
      date,
      count: repairTimelineData[date],
    }));

  return (
    <div className="container mx-auto text-black p-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        Combined Machine and Repair Request Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            Machine Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={machinePieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {machinePieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Machine Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            Repair Request Priority Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={repairPieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {repairPieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Repair Request Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={repairBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Repair Requests Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={repairLineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Machine List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {machineData.slice(0, 5).map((machine) => (
                  <tr key={machine.item_id} className="border-b">
                    <td className="px-4 py-2">{machine.item_id}</td>
                    <td className="px-4 py-2">{machine.name}</td>
                    <td className="px-4 py-2">{machine.type}</td>
                    <td className="px-4 py-2">{machine.m_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Repair Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Request ID</th>
                  <th className="px-4 py-2">Item ID</th>
                  <th className="px-4 py-2">Priority</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {repairData.slice(0, 5).map((request) => (
                  <tr key={request.request_id} className="border-b">
                    <td className="px-4 py-2">{request.request_id}</td>
                    <td className="px-4 py-2">{request.item_id}</td>
                    <td className="px-4 py-2">{request.priority_level}</td>
                    <td className="px-4 py-2">{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedDashboard;
