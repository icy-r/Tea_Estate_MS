import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const TaskPriorityManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/requestMaintenance");
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      await axios.put(`/requestMaintenance/${taskId}`, {
        priority: newPriority,
      });
      fetchTasks();
      setError(null);
    } catch (error) {
      console.error("Error updating priority:", error);
      setError("Failed to update priority. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Task Priority Management
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      {tasks.length === 0 ? (
        <p className="text-black">No tasks available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-black text-left">Task</th>
              <th className="py-2 px-4 border-b text-black text-center">
                Current Priority
              </th>
              <th className="py-2 px-4 border-b text-black text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-black">
                  {task.requestNumber}
                </td>
                <td className="py-2 px-4 border-b capitalize text-black text-center">
                  {task.priority}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <select
                    value={task.priority}
                    onChange={(e) => updatePriority(task._id, e.target.value)}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
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
      )}
    </div>
  );
};

export default TaskPriorityManagement;
