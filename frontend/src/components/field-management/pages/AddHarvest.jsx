import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
//import { format } from "date-fns";

const AddHarvest = () => {
  const [labours, setLabours] = useState([]);
  const [harvestData, setHarvestData] = useState([]);

  //const currentDate = format(new Date(), "yyyy-MM-dd");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Fetch labours with role 'labour'
  const fetchLabours = async () => {
    try {
      const response = await axios.get("/labours"); // Fetch all labours
      const filteredLabours = response.data.filter(
        (labour) => labour.role === "Labour"
      ); // Filter for role 'Labour'

      const initialData = filteredLabours.map((labour) => ({
        labour_id: labour.id,
        labour_name: labour.firstName,
        field_name: labour.assignedField,
        date: currentDate,
        best_qnty: 0,
        good_qnty: 0,
        damaged_qnty: 0,
      }));
      setLabours(filteredLabours); // Set the filtered labors
      setHarvestData(initialData);
    } catch (error) {
      console.error("Error fetching labour data:", error);
    }
  };

  useEffect(() => {
    fetchLabours();
  }, []);

  // Handle change in quantity inputs
  const handleQuantityChange = (index, field, value) => {
    const updatedHarvestData = [...harvestData];
    updatedHarvestData[index][field] = parseInt(value, 10) || 0;
    setHarvestData(updatedHarvestData);
  };

  // Handle submit action
  const handleSubmit = async () => {
    try {
      // Ensure all harvest records are processed
      const promises = harvestData.map(async (harvest) => {
        const total =
          harvest.best_qnty + harvest.good_qnty + harvest.damaged_qnty;

        // Add to harvests collection
        await axios.post("/harvests", {
          id: harvest.labour_id,
          labour_name: harvest.labour_name,
          field_name: harvest.field_name,
          date: harvest.date,
          best_qnty: harvest.best_qnty,
          good_qnty: harvest.good_qnty,
          damaged_qnty: harvest.damaged_qnty,
          total: total,
        });

        // // Update labour's harvest_qnty in labours collection
        // await axios.patch(`/labours/${harvest.labour_id}`, {
        //   $inc: { harvest_qnty: total },
        // });

        // // Update field's harvest_qnty in fields collection
        // await axios.patch(`/fields/${harvest.field_name}`, {
        //   $inc: { harvest_qnty: total },
        // });
      });

      // Wait for all promises to resolve before proceeding
      await Promise.all(promises);

      alert("Harvest data added successfully!");
      fetchLabours(); // Refresh the data after submission
    } catch (error) {
      console.error(
        "Error adding harvest data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Add Daily Harvest</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Labour Name</th>
              <th className="py-2 px-4 text-left">Assigned Field</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Best Quality</th>
              <th className="py-2 px-4 text-left">Good Quality</th>
              <th className="py-2 px-4 text-left">Poor Quality</th>
            </tr>
          </thead>
          <tbody>
            {labours.length > 0 ? (
              labours.map((labour, index) => (
                <tr key={labour.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{labour.firstName}</td>
                  <td className="py-2 px-4 border">{labour.assignedField}</td>
                  <td className="py-2 px-4 border">{currentDate}</td>
                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      value={harvestData[index].best_qnty}
                      onChange={(e) =>
                        handleQuantityChange(index, "best_qnty", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      value={harvestData[index].good_qnty}
                      onChange={(e) =>
                        handleQuantityChange(index, "good_qnty", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      value={harvestData[index].damaged_qnty}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          "damaged_qnty",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No labours available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        onClick={handleSubmit}
      >
        Submit Harvest Data
      </button>
    </div>
  );
};

export default AddHarvest;
