import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

const AssignLabours = () => {
  const [labours, setLabours] = useState([]);
  const [fields, setFields] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [selectedField, setSelectedField] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/labours/");
      const labourList = response.data;
      setLabours(labourList);
    } catch (error) {
      console.error("Error fetching labours data:", error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await axios.get("/fields/");
      setFields(response.data);
    } catch (error) {
      console.error("Error fetching fields data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAssignClick = (labour) => {
    setSelectedLabour(labour);
    setIsAssigning(true);
    fetchFields();
  };

  const handleReassign = async (labourId) => {
    try {
      await axios.put(`/labours/${labourId}`, {
        assignedField: "none",
      });

      setLabours((prevLabours) =>
        prevLabours.map((labour) =>
          labour.id === labourId ? { ...labour, assignedField: "none" } : labour
        )
      );

      console.log(`Labour ${labourId} successfully reassigned to 'none'`);
    } catch (error) {
      console.error("Error reassigning labour:", error);
    }
  };

  const handleAssignSubmit = async () => {
    if (selectedField) {
      console.log("Selected Labour:", selectedLabour);
      console.log("Selected Field:", selectedField);

      try {
        const response = await axios.put(`/labours/${selectedLabour.id}`, {
          assignedField: selectedField,
        });

        console.log("Response from server:", response.data);

        setIsAssigning(false);
        setSelectedField("");
        setSelectedLabour(null);
        fetchDetails();
      } catch (error) {
        console.error("Error assigning field:", error);
      }
    } else {
      console.warn("No field selected!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Assign Labours</h1>

      {/* Show the form if assigning */}
      {isAssigning && (
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">
            Assign Field to {selectedLabour.firstName}
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Select Field
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select a field</option>
              {fields.map((field) => (
                <option key={field.id} value={field.name}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAssignSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Employee ID</th>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Assigned Field</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labours.length > 0 ? (
              labours.map((labour) => (
                <tr key={labour.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{labour.id}</td>
                  <td className="py-2 px-4 border">{labour.firstName}</td>
                  <td className="py-2 px-4 border">{labour.lastName}</td>
                  <td className="py-2 px-4 border">{labour.role}</td>
                  <td className="py-3 px-4">
                    {labour.assignedField !== "none" ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                        Assigned
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                        Not Assigned
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border">{labour.assignedField}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    {labour.assignedField === "none" ? (
                      <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleAssignClick(labour)}
                      >
                        Assign
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleReassign(labour.id)}
                      >
                        Reassign
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Labours available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignLabours;
