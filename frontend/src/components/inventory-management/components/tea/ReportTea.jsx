import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import { Button, TextField, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportTea = () => {
  const [teaCollection, setTeaCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeaCollection, setFilteredTeaCollection] = useState([]);
  const [searchError, setSearchError] = useState(false); // State for search error

  // Fetch tea details from the API
  const fetchTeaDetails = async () => {
    try {
      const response = await axios.get("/tea/");
      setTeaCollection(response.data);
      setFilteredTeaCollection(response.data); // Initialize filtered collection
    } catch (error) {
      console.error("Error fetching tea data:", error.message);
    }
  };

  useEffect(() => {
    fetchTeaDetails(); // Call fetch function on component mount
  }, []);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchError(true); // Set error if search input is empty
      return;
    }
    setSearchError(false); // Clear error if input is valid

    const results = teaCollection.filter(tea =>
      Object.values(tea).some(value =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );

    setFilteredTeaCollection(results);
  };

  const handleClear = () => {
    setSearchInput(''); // Clear search input
    setFilteredTeaCollection(teaCollection); // Reset to full list
    setSearchError(false); // Clear any error state
  };

  const handleGenerateReport = () => {
    if (filteredTeaCollection.length === 0) {
      alert("No data to print in report."); // Alert if no data available
      return;
    }

    const doc = new jsPDF();
    doc.text("Tea Report", 15, 10);

    doc.autoTable({
      head: [['Tea ID', 'Name', 'Grade', 'Quantity', 'Added Date', 'Minimum Level']],
      body: filteredTeaCollection.map(tea => [
        tea.teaId,
        tea.teaName,
        tea.teaGrade,
        tea.quantityInStock,
        new Date(tea.addedDate).toLocaleDateString(),
        tea.minimumLevel
      ]),
    });

    doc.save('tea_report.pdf');
  };

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-4">Tea Report</Typography>

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

      {/* Tea Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Tea ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Grade</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Added Date</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeaCollection.length > 0 ? (
              filteredTeaCollection.map((tea) => (
                <tr key={tea.teaId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{tea.teaId}</td>
                  <td className="py-2 px-4 border">{tea.teaName}</td>
                  <td className="py-2 px-4 border">{tea.teaGrade}</td>
                  <td className="py-2 px-4 border">{tea.quantityInStock}</td>
                  <td className="py-2 px-4 border">{new Date(tea.addedDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{tea.minimumLevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No tea items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTea;
