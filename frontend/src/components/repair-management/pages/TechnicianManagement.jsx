import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";

const TechnicianManagement = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get("/technicians");
      setTechnicians(response.data);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Technician Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact Number</th>
            <th className="py-2 px-4 border-b">Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician._id}>
              <td className="py-2 px-4 border-b">{`${technician.firstName} ${technician.lastName}`}</td>
              <td className="py-2 px-4 border-b">{technician.Id}</td>
              <td className="py-2 px-4 border-b">{technician.email}</td>
              <td className="py-2 px-4 border-b">{technician.contactNumber}</td>
              <td className="py-2 px-4 border-b">{technician.dateOfJoining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianManagement;
