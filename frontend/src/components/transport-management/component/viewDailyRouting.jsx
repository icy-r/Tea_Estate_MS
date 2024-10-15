import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,Grid,
  TableRow, Paper, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Box, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, Snackbar, Alert,TablePagination
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewDailyRouting = () => {
  const [transportLog, setTransportLog] = useState([]);
  const [filteredLog, setFilteredLog] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [routData,setRoutData] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

       // Handle pagination
       const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0); // Reset page to 0 when rows per page changes
      };
    



  // Form states for update
  const [updateForm, setUpdateForm] = useState({
    route_id: '', vehicle_id: '', type: '', status: '', date: '', time: ''
  });

  useEffect(() => {
    const fetchTransportLog = async () => {
      try {
        const response = await axios.get('/transportLog/');
        if (response.data) {
          setTransportLog(response.data);
          setFilteredLog(response.data);
        }
        const response2 = await axios.get("/routes/");
        console.log("API Response:", response2.data);
        setRoutData(response2.data);
      } catch (error) {
        console.error('Error fetching transport log:', error);
      }
    };

    fetchTransportLog();
  }, []);

  // Filter Logic
  const handleFilterChange = () => {
    let filteredData = transportLog;

    // Apply status, route, type filters, and date range
    if (statusFilter) filteredData = filteredData.filter(log => log.status === statusFilter);
    if (routeFilter) filteredData = filteredData.filter(log => log.route_id === routeFilter);
    if (typeFilter) filteredData = filteredData.filter(log => log.type === typeFilter);
    if (startDate && endDate) {
      filteredData = filteredData.filter(log => {
        const logDate = dayjs(log.date);
        return logDate.isAfter(dayjs(startDate)) && logDate.isBefore(dayjs(endDate));
      });
    }

    setFilteredLog(filteredData);
  };


  // Delete Logic
  const handleDelete = async () => {
    if (selectedLog) {
      try {
        await axios.delete(`/transportLog/${selectedLog._id}`);
        setSuccessMessage('Record deleted successfully');
        setFilteredLog(filteredLog.filter(log => log._id !== selectedLog._id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
    setOpenDeleteDialog(false);
  };

  // Open Update Dialog with selected data
  const handleUpdateClick = (log) => {
    setSelectedLog(log);
    setUpdateForm({ ...log });
    setOpenUpdateDialog(true);
  };

  // Update Logic
  const handleUpdate = async () => {
    try {
      await axios.put(`/transportLog/${selectedLog._id}`, updateForm);
      setSuccessMessage('Record updated successfully');
      setFilteredLog(filteredLog.map(log => (log._id === selectedLog._id ? updateForm : log)));
    } catch (error) {
      console.error('Error updating record:', error);
    }
    setOpenUpdateDialog(false);
  };

  // Function to generate and download the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Transport Log Report", 14, 22);
    
    // Prepare data for the PDF
    const pdfData = filteredLog.map(transportDet => ([
      transportDet?.route_id,
      transportDet?.vehicle_id,
      transportDet?.type,
      transportDet?.status,
      new Date(transportDet?.date).toLocaleDateString(),
      transportDet?.time
    ]));


    // Add a table to the PDF
    doc.autoTable({
      head: [['Route ID', 'Vehicle ID', 'Type', 'Status', 'Date', 'Time']],
      body: pdfData,
      startY: 30,
      headStyles: {
        fillColor: [21, 245, 186], // RGB color for the header background (example: blue)
        textColor: 0, // White text color for the header
        styles: {
            lineWidth: 1, // Thickness of the border
            lineColor: [0, 0, 0] // Black border color
          }
      }
    });

    doc.save('Transport_Log_Report.pdf');
  };

  // Handle Close for Success Snackbar
  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='px-6'>
        <Typography variant="h4" gutterBottom>
          View Daily Routing
        </Typography>

        {/* Filters */}
        <Box display="flex" gap={2} marginBottom={2}>
          {/* Status Filter */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="route-select-label">Route ID</InputLabel>
            <Select
              labelId="route-select-label"
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {routData.map((route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Type Filter */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Harvest transportation">Harvest Transportation</MenuItem>
              <MenuItem value="Employee transportation">Employee Transportation</MenuItem>
              <MenuItem value="Delivery transportation">Delivery Transportation</MenuItem>
            </Select>
          </FormControl>

          {/* Start Date Picker */}
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* End Date Picker */}
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* Apply Filter Button */}
          <Button variant="contained" onClick={handleFilterChange}>
            Apply Filters
          </Button>

          {/* PDF Download Button */}
          <Button variant="contained" color="secondary" onClick={generatePDF}>
            Download PDF
          </Button>
        </Box>

              
            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: "0.5" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#15F5BA' }}>
                    <TableCell>Route ID</TableCell>
                    <TableCell>Vehicle ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLog
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.route_id}</TableCell>
                        <TableCell>{log.vehicle_id}</TableCell>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>{log.status}</TableCell>
                        <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                        <TableCell>{log.time}</TableCell>
                        <TableCell>
                          {/* Update and Delete buttons */}
                          <Button variant="contained" onClick={() => handleUpdateClick(log)} color="primary" sx={{ bgcolor: '#15F5BA', color:'black' }}>
                            Update
                          </Button>
                          <Button variant="contained" color="error" onClick={() => { setSelectedLog(log); setOpenDeleteDialog(true); }} sx={{ backgroundColor: '#FA7070', marginLeft: '10px',color:'black' }}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredLog.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

        {/* Snackbar for success messages */}
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this record?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

            {/* Update Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Update Record
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    label="Route ID"
                    variant="outlined"
                    fullWidth
                    value={updateForm.route_id}
                    onChange={(e) => setUpdateForm({ ...updateForm, route_id: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Vehicle ID"
                    variant="outlined"
                    fullWidth
                    value={updateForm.vehicle_id}
                    onChange={(e) => setUpdateForm({ ...updateForm, vehicle_id: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Type"
                    variant="outlined"
                    fullWidth
                    value={updateForm.type}
                    onChange={(e) => setUpdateForm({ ...updateForm, type: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={updateForm.status}
                        onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                    >
                        <MenuItem value="upcoming">Upcoming</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={updateForm.date}
                    onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Time"
                    type="time"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={updateForm.time}
                    onChange={(e) => setUpdateForm({ ...updateForm, time: e.target.value })}
                    />
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenUpdateDialog(false)} color="secondary" variant="outlined">
                Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" variant="contained">
                Update
                </Button>
            </DialogActions>
            </Dialog>

      </div>
    </LocalizationProvider>
  );
};

export default ViewDailyRouting;