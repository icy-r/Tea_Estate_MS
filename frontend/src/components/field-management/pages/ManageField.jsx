import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const ManageField = () => {
  const [fields, setFields] = useState([]);
  const navigateTo = useNavigate();

  const fetchDetails = async () => {
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

  const handleUpdate = (field) => {
    navigateTo(`/admin/field/manage/${field.id}`, { state: { field } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/fields/${id}`);
      alert("Field deleted successfully");
      setFields(fields.filter((field) => field.id !== id));
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Field Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Field No</th>
              <th className="py-2 px-4 text-left">Field Name</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Fertilizer Schedule</th>
              <th className="py-2 px-4 text-left">Area</th>
              <th className="py-2 px-4 text-left">Supervisor</th>
              <th className="py-2 px-4 text-left">Crop Stage</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.length > 0 ? (
              fields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{field.id}</td>
                  <td className="py-2 px-4 border">{field.name}</td>
                  <td className="py-2 px-4 border">{field.location}</td>
                  <td className="py-2 px-4 border">{field.fertilizerSchedule}</td>
                  <td className="py-2 px-4 border">{field.area}</td>
                  <td className="py-2 px-4 border">{field.labour}</td>
                  <td className="py-2 px-4 border">{field.cropStage}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(field)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDelete(field.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No fields available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageField;
