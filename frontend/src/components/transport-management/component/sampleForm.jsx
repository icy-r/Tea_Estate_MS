import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "../../../services/axios.js";

const UploadContainer = styled("div")`
  border: 2px dashed #e0e0e0;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const SampleForm = () => {
  const [formData, setFormData] = useState({
    owner_name:"",
    owner_address: "",
    id: "",
    chassisNo: "",
    typevType: "lorry", // default value
    manufactureYear: "2000", // default value
    assignedDept:"",
    driver_id:"",
    image: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
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
    } catch (error) {
      console.error("Error submitting form:", error);
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
      assignedDept:"",
      driver_id:"",
      image: null,
    });
  };

  return (
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
            />
                     <TextField
              label="Address "
              variant="outlined"
              required
              helperText="Main city"
              name="owner_address"
              value={formData.owner_address}
              onChange={handleInputChange}
            />
           
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
   
          
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
            />
            <TextField
              label="Cassie Number"
              variant="outlined"
              required
              name="chassisNo"
              value={formData.chassisNo}
              onChange={handleInputChange}
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
              <MenuItem value="lorry">Lorry</MenuItem>
              {/* Add more options as needed */}
            </TextField>
            <TextField
              label="Year of Manufacture"
              variant="outlined"
              required
              name="manufactureYear"
              value={formData.manufactureYea}
              onChange={handleInputChange}
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
            >
              <MenuItem value="lorry">Lorry</MenuItem>
            
            </TextField>
            <TextField
              label="Driver"
              variant="outlined"
              required
              name="driver_id"
              value={formData.driver_id}
              onChange={handleInputChange}
            />
           
          </div>

          <UploadContainer>
            <input
              type="file"
              id="vehicle-image"
              className="hidden"
              name="image"
              onChange={handleFileChange}
            />
            <label htmlFor="vehicle-image" className="cursor-pointer">
              Click to upload or drag and drop Vehicle Image
              <br />
              <span className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 3MB)
              </span>
            </label>
          </UploadContainer>

          <div className="flex justify-between mt-6">
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
              <Button variant="outlined" color="primary" onClick={handleClear}>
                Clear
              </Button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default SampleForm;
