import React, { useState } from 'react';
import axios from 'axios'; // Replace with your axios instance if necessary
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Typography } from '@mui/material';

const AddRequestForm = () => {
  const [formData, setFormData] = useState({
    request_id: '',
    item_id: '',
    request_date: '',
    issue_description: '',
    priority_level: 'Low', // Default value
    assigned_technician_id: '',
    status: 'Pending', // Default value
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/requests', formData); // Replace with your actual endpoint
      setAlert({ open: true, message: 'Request submitted successfully!', severity: 'success' });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting request:', error);
      setAlert({ open: true, message: 'Error submitting request.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: '16px', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Request
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Request ID"
          name="request_id"
          value={formData.request_id}
          onChange={handleChange}
          required
          margin="normal"
          type="number"
        />

        <TextField
          fullWidth
          label="Item ID"
          name="item_id"
          value={formData.item_id}
          onChange={handleChange}
          required
          margin="normal"
          type="number"
        />

        <TextField
          fullWidth
          label="Request Date"
          name="request_date"
          value={formData.request_date}
          onChange={handleChange}
          required
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          label="Issue Description"
          name="issue_description"
          value={formData.issue_description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={4}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority Level</InputLabel>
          <Select
            name="priority_level"
            value={formData.priority_level}
            onChange={handleChange}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Technician ID"
          name="assigned_technician_id"
          value={formData.assigned_technician_id}
          onChange={handleChange}
          required
          margin="normal"
          type="number"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>

      {alert.open && (
        <Typography variant="body2" color={alert.severity === 'success' ? 'green' : 'red'}>
          {alert.message}
        </Typography>
      )}
    </Box>
  );
};

export default AddRequestForm;


