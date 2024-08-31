import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';

const ManageField = () => {
  const [fields, setFields] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/fields/");
      setFields(response.data); // Update the state with the fetched data
      console.log("Fields data:", response.data);
    } catch (error) {
      console.error("Error fetching fields data:", error);
    }
  };

  useEffect(() => {
    fetchDetails(); // Fetch data on component mount
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <div>
      <h1>Manage Field</h1>
      {fields.length > 0 ? (
        fields.map((field, i) => (
          <div key={i}>
            <p>Field Name: {field.name}</p>
            <p>Location: {field.location}</p>
            <p>Fertilizer Schedule: {field.fertilizerSchedule}</p>
            <p>Area: {field.area}</p>
            <p>Labour: {field.labour}</p>
            <p>Crop Stage: {field.cropStage}</p>
            <p>Employees Required: {field.emp_required}</p>
            <p>Employees Assigned: {field.emp_assigned}</p>
            <p>No. of Employees Assigned: {field.no_emp_assigned}</p>
          </div>
        ))
      ) : (
        <p>No fields available</p>
      )}
    </div>
  );
};

export default ManageField;


