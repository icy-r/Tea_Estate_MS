import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Button, TextField, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportUtilities = () => {
  const [utilitiesCollection, setUtilitiesCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUtilitiesCollection, setFilteredUtilitiesCollection] = useState([]);
  const [searchError, setSearchError] = useState(false); // State for search error

  // Fetch utility details from the API
  const fetchUtilityDetails = async () => {
    try {
      const response = await axios.get("/utilities/"); // Adjust the endpoint as needed
      setUtilitiesCollection(response.data);
      setFilteredUtilitiesCollection(response.data); // Initialize filtered collection
    } catch (error) {
      console.error("Error fetching utility data:", error.message);
    }
  };

  useEffect(() => {
    fetchUtilityDetails(); // Call fetch function on component mount
  }, []);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchError(true); // Set error if search input is empty
      return;
    }
    setSearchError(false); // Clear error if input is valid

    const results = utilitiesCollection.filter(utility =>
      Object.values(utility).some(value =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );

    setFilteredUtilitiesCollection(results);
  };

  const handleClear = () => {
    setSearchInput(''); // Clear search input
    setFilteredUtilitiesCollection(utilitiesCollection); // Reset to full list
    setSearchError(false); // Clear any error state
  };

  const handleGenerateReport = () => {
    if (filteredUtilitiesCollection.length === 0) {
      alert("No data to print in report."); // Alert if no data available
      return;
    }

    const doc = new jsPDF();
    doc.text("Utilities Report", 15, 10);

    doc.autoTable({
      head: [['Utility ID', 'Name', 'Type', 'Quantity', 'Daily Distribution', 'Minimum Level']],
      body: filteredUtilitiesCollection.map(utility => [
        utility.utilityId,
        utility.utilityName,
        utility.utilityType,
        utility.quantityInStock,
        utility.dailyDistributionAmount,
        utility.minimumLevel
      ]),
    });

    doc.save('utilities_report.pdf');
  };

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-4">Utilities Report</Typography>

      {/* Search Section */}
      <div className="mb-4">
        <TextField
          variant="outlined"
          size="medium"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          error={searchError} // Set error prop based on state
          helperText={searchError ? "Please enter a value to search." : ""} // Error message
          style={{ marginRight: '10px', flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginRight: '10px' }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          style={{ marginRight: '10px' }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </div>

      {/* Utilities Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Utility ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Daily Distribution</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredUtilitiesCollection.length > 0 ? (
              filteredUtilitiesCollection.map((utility) => (
                <tr key={utility.utilityId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{utility.utilityId}</td>
                  <td className="py-2 px-4 border">{utility.utilityName}</td>
                  <td className="py-2 px-4 border">{utility.utilityType}</td>
                  <td className="py-2 px-4 border">{utility.quantityInStock}</td>
                  <td className="py-2 px-4 border">{utility.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{utility.minimumLevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No utility items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportUtilities;
