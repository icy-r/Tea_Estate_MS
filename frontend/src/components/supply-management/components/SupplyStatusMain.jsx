import axios from "../../../services/axios.js";
import { useEffect, useState } from "react";
import StatusCard from "../../divs/StatusCard.jsx";
import { Snackbar, Alert } from "@mui/material";

const StatusMain = () => {
  const [supplierCount, setSupplierCount] = useState([]); // State for suppliers
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of the snackbar

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliersRes = await axios.get("/suppliers"); // Fetch suppliers

        const suppliersData = suppliersRes.data; // Get suppliers data

        // Create formatted data for StatusCard
        setSupplierCount([
          { title: "Total Suppliers", count: suppliersData.length },
        ]);

        // Show success alert
        setSnackbarMessage("Suppliers data fetched successfully!");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error fetching suppliers data:", error);
        // Show error alert
        setSnackbarMessage("Error fetching suppliers data");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='w-full flex items-center bg-color_extra justify-between p-2'>
      <StatusCard data={supplierCount} />
      
      {/* Snackbar for alerts */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StatusMain;
