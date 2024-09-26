import React, { useState } from "react";
import { TextField, MenuItem, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "../../../services/axios.js";

const UploadContainer = styled("div")`
  border: 2px dashed #e0e0e0;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const VehicleAddForm = () => {
  const [formData, setFormData] = useState({
    owner_name: "",
    owner_address: "",
    id: "",
    chassisNo: "",
    type: "lorry", // default value
    manufactureYear: "2000", // default value
    assignedDept: "",
    driver_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.owner_name) validationErrors.owner_name = "Owner name is required";
    if (!formData.owner_address) validationErrors.owner_address = "Address is required";
    if (!formData.id) validationErrors.id = "Registration number is required";
    if (!formData.chassisNo) validationErrors.chassisNo = "Chassis number is required";
    if (!/^\d{4}$/.test(formData.manufactureYear) || formData.manufactureYear < 1990)
      validationErrors.manufactureYear = "Valid year required (>=1990)";
    if (!formData.assignedDept) validationErrors.assignedDept = "Assigned department is required";
    if (!formData.driver_id) validationErrors.driver_id = "Driver ID is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fix the errors before submitting.");
      setSnackbarOpen(true);
      return;
    }

    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    try {
      const response = await axios.post("/vehicles", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
      setSnackbarMessage("Vehicle added successfully!");
      setSnackbarOpen(true);
      handleClear(); // Clear form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleClear = () => {
    setFormData({
      owner_name: "",
      owner_address: "",
      id: "",
      chassisNo: "",
      type: "lorry",
      manufactureYear: "2000",
      assignedDept: "",
      driver_id: "",
      image: null,
    });
    setErrors({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-start p-8">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">Vehicle Owner Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Owner Name"
                variant="outlined"
                required
                name="owner_name"
                value={formData.owner_name}
                onChange={handleInputChange}
                error={!!errors.owner_name}
                helperText={errors.owner_name || ""}
              />
              <TextField
                label="Address"
                variant="outlined"
                required
                helperText={errors.owner_address || "Main city"}
                name="owner_address"
                value={formData.owner_address}
                onChange={handleInputChange}
                error={!!errors.owner_address}
              />
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Registration Number"
                variant="outlined"
                required
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                error={!!errors.id}
                helperText={errors.id || ""}
              />
              <TextField
                label="Chassis Number"
                variant="outlined"
                required
                name="chassisNo"
                value={formData.chassisNo}
                onChange={handleInputChange}
                error={!!errors.chassisNo}
                helperText={errors.chassisNo || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <TextField
                select
                label="Type of vehicle"
                variant="outlined"
                required
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <MenuItem value="Tipper">Tipper</MenuItem>
                <MenuItem value="Tactor">Tactor</MenuItem>
                <MenuItem value="lorry">Lorry</MenuItem>
              </TextField>
              <TextField
                label="Year of Manufacture"
                variant="outlined"
                required
                name="manufactureYear"
                value={formData.manufactureYear}
                onChange={handleInputChange}
                error={!!errors.manufactureYear}
                helperText={errors.manufactureYear || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <TextField
                select
                label="Assigned department"
                variant="outlined"
                required
                name="assignedDept"
                value={formData.assignedDept}
                onChange={handleInputChange}
                error={!!errors.assignedDept}
                helperText={errors.assignedDept || ""}
              >
                <MenuItem value="Employee Transport">Employee Transport</MenuItem>
                <MenuItem value="Harvest Transport">Harvest Transport</MenuItem>
                <MenuItem value="Delivery Transport">Delivery Transport</MenuItem>
              </TextField>
              <TextField
                label="Driver"
                variant="outlined"
                required
                name="driver_id"
                value={formData.driver_id}
                onChange={handleInputChange}
                error={!!errors.driver_id}
                helperText={errors.driver_id || ""}
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button type="submit" variant="contained"   sx={{ bgcolor: '#15F5BA', '&:hover': { bgcolor: '#1AACAC',boxShadow: 'none' },boxShadow: 'none',mr:2, color: 'black', border: 'none' }}>
                Register
              </Button>
              <Button variant="outlined" sx={{ bgcolor: '#FA7070', border:'none','&:hover': { bgcolor: '#BF4010',boxShadow:'none' ,border:'none'} ,boxShadow: 'none',color: 'black'}} onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position in top right
        TransitionComponent={(props) => (
          <div {...props} style={{ transition: "transform 0.5s ease" }} />
        )}
      />
    </>
  );
};

export default VehicleAddForm;
