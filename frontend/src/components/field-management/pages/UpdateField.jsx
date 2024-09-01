import React, { useState } from 'react';
import axios from '../../../services/axios.js';
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
    <div>
      <h1>Update Field</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="id"
          value={fieldData.id}  
          onChange={handleChange}
          placeholder="Field No"
          required
          className="border p-2"
          readOnly  
        />
        <input
          name="name"
          value={fieldData.name}  
          onChange={handleChange}
          placeholder="Field Name"
          required
          className="border p-2"
        />
        <input
          name="location"
          value={fieldData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2"
        />
        <input
          name="fertilizerSchedule"
          value={fieldData.fertilizerSchedule}
          onChange={handleChange}
          placeholder="Fertilizer Schedule"
          required
          className="border p-2"
        />
        <input
          name="area"
          value={fieldData.area}
          onChange={handleChange}
          placeholder="Area"
          required
          className="border p-2"
        />
        <input
          name="labour"
          value={fieldData.labour}
          onChange={handleChange}
          placeholder="Labour"
          required
          className="border p-2"
        />
        <input
          name="cropStage"
          value={fieldData.cropStage}
          onChange={handleChange}
          placeholder="Crop Stage"
          required
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Confirm Update
        </button>
      </form>
    </div>
  );
};

export default UpdateField;
