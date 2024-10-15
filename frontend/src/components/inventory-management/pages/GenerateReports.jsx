import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import ReportTea from '../components/tea/ReportTea'; 
import ReportFuel from '../components/fuel/ReportFuel'; 
import ReportFert from '../components/fertilizer/ReportFert'; 
import ReportUtilities from '../components/utilities/ReportUtilities'; // Import ReportUtilities

const GenerateReports = () => {
  const [currentTable, setCurrentTable] = useState(null);

  // Function to show the ReportTea component
  const handleShowTea = () => {
    setCurrentTable('Tea');
  };

  // Function to show the ReportFuel component
  const handleShowFuel = () => {
    setCurrentTable('Fuel');
  };

  // Function to show the ReportFert component
  const handleShowFert = () => {
    setCurrentTable('Fertilizer');
  };

  // Function to show the ReportUtilities component
  const handleShowUtilities = () => {
    setCurrentTable('Utilities');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Generate Reports</h1>

      {/* Inventory Selection Buttons */}
      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowTea}
        >
          Tea
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowFuel}
        >
          Fuel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowFert}
        >
          Fertilizer
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowUtilities} // Add button for Utilities
        >
          Utilities
        </Button>
      </Box>

      {/* Conditional Rendering of Report Components */}
      {currentTable === 'Tea' && <ReportTea />}
      {currentTable === 'Fuel' && <ReportFuel />}
      {currentTable === 'Fertilizer' && <ReportFert />}
      {currentTable === 'Utilities' && <ReportUtilities />} {/* Render ReportUtilities when selected */}

      {/* Message when no table is selected */}
      {!currentTable && (
        <Typography variant="body2" style={{ marginTop: '20px' }}>
          Please select an inventory type to display the report.
        </Typography>
      )}
    </div>
  );
};

export default GenerateReports;
