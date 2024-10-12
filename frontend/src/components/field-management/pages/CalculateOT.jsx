import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

const OvertimeCalculator = () => {
  const [harvestData, setHarvestData] = useState([]);
  const [otValue, setOtValue] = useState(60); // Default value for overtime amount per kg
  const [fixedWeight, setFixedWeight] = useState(20); // Default fixed weight threshold
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  const [calculatedData, setCalculatedData] = useState([]);

  // Function to fetch harvest data by current date
  const fetchHarvestData = async () => {
    try {
      const response = await axios.get("harvests/");
      console.log("Response from /harvests:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const filteredHarvests = response.data.filter((harvest) => {
          const harvestDate = harvest.date.split("T")[0];
          return harvestDate === currentDate;
        });

        if (filteredHarvests.length === 0) {
          console.warn("No harvest data found for the current date.");
          setHarvestData([]);
          return;
        }

        const initialData = filteredHarvests.map((harvest) => ({
          name: harvest.labour_name,
          harvest_qnty: harvest.total || 0, // Ensure total is the correct quantity
          overtimeAllowance: 0, // Initialize overtime to zero
        }));

        setHarvestData(initialData);
        setCalculatedData(initialData); // Set the calculated data to the initial data
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching harvest data:", error);
      alert("Error fetching harvest data.");
    }
  };

  // Fetch the harvest data on component load and whenever currentDate changes
  useEffect(() => {
    fetchHarvestData();
  }, [currentDate]);

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(now);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60 * 1000); // Update time every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate overtime allowance for each employee
  const handleCalculate = () => {
    if (harvestData.length === 0) {
      alert("No harvest data to calculate.");
      return;
    }

    const updatedData = harvestData.map((item) => {
      const overtimeAllowance =
        otValue * Math.max(0, item.harvest_qnty - fixedWeight);
      return { ...item, overtimeAllowance };
    });

    setCalculatedData(updatedData); // Update the calculated data
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Overtime Calculator
      </h1>
      <div className="flex justify-between items-center mb-4">
        <span>Date: {currentDate}</span>
        <div className="flex gap-2 items-center">
          <label htmlFor="otValue" className="font-semibold">
            Overtime Amount per KG:
          </label>
          <input
            id="otValue"
            type="number"
            value={otValue}
            onChange={(e) => setOtValue(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <label htmlFor="fixedWeight" className="font-semibold">
            Fixed Harvest Weight:
          </label>
          <input
            id="fixedWeight"
            type="number"
            value={fixedWeight}
            onChange={(e) => setFixedWeight(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <button
            onClick={handleCalculate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Calculate
          </button>
        </div>
      </div>

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="w-full bg-teal-500 text-white">
            <th className="border p-3">Name</th>
            <th className="border p-3">Total Harvest Today</th>
            <th className="border p-3">Overtime Allowance</th>
          </tr>
        </thead>
        <tbody>
          {calculatedData.length > 0 ? (
            calculatedData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-3">{item.name}</td>
                <td className="border p-3">{item.harvest_qnty}</td>
                <td className="border p-3">
                  {item.overtimeAllowance.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border p-3 text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeCalculator;
