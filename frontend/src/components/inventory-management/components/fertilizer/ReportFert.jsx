import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Button, TextField, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportFert = () => {
  const [fertCollection, setFertCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredFertCollection, setFilteredFertCollection] = useState([]);
  const [searchError, setSearchError] = useState(false); // State for search error

  // Fetch fertilizer details from the API
  const fetchFertDetails = async () => {
    try {
      const response = await axios.get("/fert/");
      setFertCollection(response.data);
      setFilteredFertCollection(response.data); // Initialize filtered collection
    } catch (error) {
      console.error("Error fetching fertilizer data:", error.message);
    }
  };

  useEffect(() => {
    fetchFertDetails(); // Call fetch function on component mount
  }, []);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchError(true); // Set error if search input is empty
      return;
    }
    setSearchError(false); // Clear error if input is valid

    const results = fertCollection.filter(fert =>
      Object.values(fert).some(value =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );

    setFilteredFertCollection(results);
  };

  const handleClear = () => {
    setSearchInput(''); // Clear search input
    setFilteredFertCollection(fertCollection); // Reset to full list
    setSearchError(false); // Clear any error state
  };

  const handleGenerateReport = () => {
    if (filteredFertCollection.length === 0) {
      alert("No data to print in report."); // Alert if no data available
      return;
    }

    const doc = new jsPDF();
    doc.text("Fertilizer Report", 15, 10);

    doc.autoTable({
      head: [['Fertilizer ID', 'Name', 'Type', 'Quantity', 'Daily Distribution', 'Minimum Level']],
      body: filteredFertCollection.map(fert => [
        fert.fertilizerId,
        fert.fertilizerName,
        fert.fertilizerType,
        fert.quantityInStock,
        fert.dailyDistributionAmount,
        fert.minimumLevel
      ]),
    });

    doc.save('fertilizer_report.pdf');
  };

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-4">Fertilizer Report</Typography>

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

      {/* Fertilizer Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Fertilizer ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Daily Distribution</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredFertCollection.length > 0 ? (
              filteredFertCollection.map((fert) => (
                <tr key={fert.fertilizerId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{fert.fertilizerId}</td>
                  <td className="py-2 px-4 border">{fert.fertilizerName}</td>
                  <td className="py-2 px-4 border">{fert.fertilizerType}</td>
                  <td className="py-2 px-4 border">{fert.quantityInStock}</td>
                  <td className="py-2 px-4 border">{fert.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{fert.minimumLevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No fertilizer items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportFert;
