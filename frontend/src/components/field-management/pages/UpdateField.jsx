import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateField from '../services/axios-update.js';

const UpdateField = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const field = location.state.field;

  const [fieldData, setFieldData] = useState({
    id: field.id,  
    name: field.name,  
    location: field.location,
    fertilizerSchedule: field.fertilizerSchedule,
    area: field.area,
    labour: field.labour,
    cropStage: field.cropStage
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldData({ ...fieldData, [name]: value });
  };


const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(fieldData);
    updateField(fieldData, navigateTo);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold text-center mb-6">Update Field</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        name="id"
        value={fieldData.id}
        onChange={handleChange}
        placeholder="Field No"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
      />
      <input
        name="name"
        value={fieldData.name}
        onChange={handleChange}
        placeholder="Field Name"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="location"
        value={fieldData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="fertilizerSchedule"
        value={fieldData.fertilizerSchedule}
        onChange={handleChange}
        placeholder="Fertilizer Schedule"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="area"
        value={fieldData.area}
        onChange={handleChange}
        placeholder="Area"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="labour"
        value={fieldData.labour}
        onChange={handleChange}
        placeholder="Labour"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="cropStage"
        value={fieldData.cropStage}
        onChange={handleChange}
        placeholder="Crop Stage"
        required
        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Confirm Update
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateField;
