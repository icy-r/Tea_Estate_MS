import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const TaskPriorityManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/maintenances");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      await axios.patch(`/maintenances/${taskId}`, { priority: newPriority });
      fetchTasks();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeClass = (lightClass, darkClass) => {
    return isDarkMode ? darkClass : lightClass;
  };

  return (
    <div
      className={`container mx-auto p-4 ${getThemeClass(
        "bg-gray-100",
        "bg-gray-800"
      )}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1
          className={`text-2xl font-bold ${getThemeClass(
            "text-gray-800",
            "text-gray-100"
          )}`}
        >
          Task Priority Management
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded ${getThemeClass(
            "bg-gray-200 text-gray-800",
            "bg-gray-700 text-gray-100"
          )}`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <table
        className={`min-w-full ${getThemeClass("bg-white", "bg-gray-700")}`}
      >
        <thead>
          <tr className={getThemeClass("bg-gray-200", "bg-gray-600")}>
            <th
              className={`py-2 px-4 border-b ${getThemeClass(
                "text-gray-700",
                "text-gray-200"
              )}`}
            >
              Task
            </th>
            <th
              className={`py-2 px-4 border-b ${getThemeClass(
                "text-gray-700",
                "text-gray-200"
              )}`}
            >
              Current Priority
            </th>
            <th
              className={`py-2 px-4 border-b ${getThemeClass(
                "text-gray-700",
                "text-gray-200"
              )}`}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className={getThemeClass(
                "hover:bg-gray-100",
                "hover:bg-gray-600"
              )}
            >
              <td
                className={`py-2 px-4 border-b ${getThemeClass(
                  "text-gray-800",
                  "text-gray-200"
                )}`}
              >
                {task.description}
              </td>
              <td
                className={`py-2 px-4 border-b ${getThemeClass(
                  "text-gray-800",
                  "text-gray-200"
                )}`}
              >
                {task.priority}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={task.priority}
                  onChange={(e) => updatePriority(task._id, e.target.value)}
                  className={`border rounded px-2 py-1 ${getThemeClass(
                    "bg-white text-gray-800",
                    "bg-gray-600 text-gray-200"
                  )}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPriorityManagement;
