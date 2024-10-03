import React, { useEffect, useState } from "react";
import axios from "../../../services/axios.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddHarvest = () => {
  const [labours, setLabours] = useState([]);
  const [harvestData, setHarvestData] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Set the date once when the component mounts
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today); // Set current date
  }, []);

  const updateDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  };

  useEffect(() => {
    updateDate(); // Call once initially to set the date

    const interval = setInterval(updateDate, 60 * 1000); // Check every minute

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  const fetchLabours = async () => {
    try {
      const response = await axios.get("/labours");
      const filteredLabours = response.data.filter(
        (labour) => labour.role === "Labour"
      );

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
      showSnackbar("Error fetching labour data", "error");
    }
  };

  // Fetch labours when currentDate changes
  useEffect(() => {
    fetchLabours();
  }, [currentDate]); // Refetch data whenever the current date changes

  // Handle change in quantity inputs
  const handleQuantityChange = (index, field, value) => {
    const updatedHarvestData = [...harvestData];
    updatedHarvestData[index][field] = parseInt(value, 10) || 0;
    setHarvestData(updatedHarvestData);
  };

  const getFieldIdByName = async (fieldName) => {
    try {
      const response = await axios.get("/fields", {
        params: { name: fieldName },
      });
      const field = response.data.find((f) => f.name === fieldName);
      return field ? field.id : null; // Return field ID if found
    } catch (error) {
      console.error("Error fetching field ID:", error);
      return null;
    }
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
          //id: harvest.id,
          labour_name: harvest.labour_name,
          field_name: harvest.field_name,
          date: harvest.date,
          best_qnty: harvest.best_qnty,
          good_qnty: harvest.good_qnty,
          damaged_qnty: harvest.damaged_qnty,
          total: total,
        });

        // Update labour's harvest_qnty and other quantities in labours collection
        await axios.put(`/labours/${harvest.labour_id}`, {
          $inc: {
            harvest_qnty: total,
            best_qnty: harvest.best_qnty,
            good_qnty: harvest.good_qnty,
            damaged_qnty: harvest.damaged_qnty,
          },
        });

        // Get field ID by field name and update field's harvest_qnty
        const fieldId = await getFieldIdByName(harvest.field_name);
        console.log("Fetched field ID:", fieldId); // Debugging
        if (fieldId) {
          await axios.put(`/fields/${fieldId}`, {
            $inc: { harvest_qnty: total },
          });
          console.log("Field updated successfully!"); // Debugging
        }
      });

      // Wait for all promises to resolve before proceeding
      await Promise.all(promises);

      showSnackbar("Harvest data added successfully!", "success");
      fetchLabours(); // Refresh the data after submission
    } catch (error) {
      console.error(
        "Error adding harvest data:",
        error.response?.data || error.message
      );
      showSnackbar("Error adding harvest data", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Adjust position here
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddHarvest;
