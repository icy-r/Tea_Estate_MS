import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Button, TextField, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportFuel = () => {
  const [fuelCollection, setFuelCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredFuelCollection, setFilteredFuelCollection] = useState([]);
  const [searchError, setSearchError] = useState(false); // State for search error

  // Fetch fuel details from the API
  const fetchFuelDetails = async () => {
    try {
      const response = await axios.get("/fuel/");
      setFuelCollection(response.data);
      setFilteredFuelCollection(response.data); // Initialize filtered collection
    } catch (error) {
      console.error("Error fetching fuel data:", error.message);
    }
  };

  useEffect(() => {
    fetchFuelDetails(); // Call fetch function on component mount
  }, []);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchError(true); // Set error if search input is empty
      return;
    }
    setSearchError(false); // Clear error if input is valid

    const results = fuelCollection.filter(fuel =>
      Object.values(fuel).some(value =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );

    setFilteredFuelCollection(results);
  };

  const handleClear = () => {
    setSearchInput(''); // Clear search input
    setFilteredFuelCollection(fuelCollection); // Reset to full list
    setSearchError(false); // Clear any error state
  };

  const handleGenerateReport = () => {
    if (filteredFuelCollection.length === 0) {
      alert("No data to print in report."); // Alert if no data available
      return;
    }

    const doc = new jsPDF();
    doc.text("Fuel Report", 15, 10);

    doc.autoTable({
      head: [['Fuel ID', 'Type', 'Quantity', 'Daily Distribution', 'Minimum Level']],
      body: filteredFuelCollection.map(fuel => [
        fuel.fuelId,
        fuel.fuelType,
        fuel.quantityInStock,
        fuel.dailyDistributionAmount,
        fuel.minimumLevel
      ]),
    });

    doc.save('fuel_report.pdf');
  };

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-4">Fuel Report</Typography>

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

      {/* Fuel Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Fuel ID</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Daily Distribution</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredFuelCollection.length > 0 ? (
              filteredFuelCollection.map((fuel) => (
                <tr key={fuel.fuelId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{fuel.fuelId}</td>
                  <td className="py-2 px-4 border">{fuel.fuelType}</td>
                  <td className="py-2 px-4 border">{fuel.quantityInStock}</td>
                  <td className="py-2 px-4 border">{fuel.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{fuel.minimumLevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No fuel items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportFuel;
