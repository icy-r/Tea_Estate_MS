import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

const ViewHarvest = () => {
  const [harvests, setHarvests] = useState([]);

  // Fetch harvest data from the collection
  const fetchHarvests = async () => {
    try {
      const response = await axios.get("/harvests/");
      setHarvests(response.data);
    } catch (error) {
      console.error("Error fetching harvests data:", error);
    }
  };

  useEffect(() => {
    fetchHarvests();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Daily Harvest Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Labour</th>
              <th className="py-2 px-4 text-left">Field</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Best Quality</th>
              <th className="py-2 px-4 text-left">Good Quality</th>
              <th className="py-2 px-4 text-left">Poor Quality</th>
              <th className="py-2 px-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {harvests.length > 0 ? (
              harvests.map((harvest) => (
                <tr key={harvest.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{harvest.labour_name}</td>
                  <td className="py-2 px-4 border">{harvest.field_name}</td>
                  <td className="py-2 px-4 border">
                    {new Date(harvest.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{harvest.best_qnty}</td>
                  <td className="py-2 px-4 border">{harvest.good_qnty}</td>
                  <td className="py-2 px-4 border">{harvest.damaged_qnty}</td>
                  <td className="py-2 px-4 border">{harvest.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No harvest records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHarvest;
