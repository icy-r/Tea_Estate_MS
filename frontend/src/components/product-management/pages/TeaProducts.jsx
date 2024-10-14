import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TeaProduct = () => {
  const [teaCollection, setTeaCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeaCollection, setFilteredTeaCollection] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [usedTeaCollection, setUsedTeaCollection] = useState({});

  // Fetch tea details from the API
  const fetchTeaDetails = async () => {
    try {
      const response = await axios.get("/tea/");
      setTeaCollection(response.data);
      setFilteredTeaCollection(response.data);

      // Initialize usedTeaCollection from localStorage
      const usedStatus = JSON.parse(localStorage.getItem('usedTeaCollection')) || response.data.reduce((acc, tea) => {
        acc[tea.teaId] = false;
        return acc;
      }, {});
      setUsedTeaCollection(usedStatus);
    } catch (error) {
      console.error("Error fetching tea data:", error.message);
    }
  };

  useEffect(() => {
    fetchTeaDetails(); // Call fetch function on component mount
  }, []);

  useEffect(() => {
    // Save usedTeaCollection to localStorage whenever it changes
    localStorage.setItem('usedTeaCollection', JSON.stringify(usedTeaCollection));
  }, [usedTeaCollection]);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchError(true); // Set error if search input is empty
      return;
    }
    setSearchError(false);

    const results = teaCollection.filter(tea =>
      Object.values(tea).some(value =>
        String(value).toLowerCase().includes(searchInput.toLowerCase())
      )
    );

    setFilteredTeaCollection(results);
  };

  const handleClear = () => {
    setSearchInput('');
    setFilteredTeaCollection(teaCollection);
    setSearchError(false);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    const sortedCollection = [...filteredTeaCollection].sort((a, b) => {
      const dateA = new Date(a.addedDate);
      const dateB = new Date(b.addedDate);

      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredTeaCollection(sortedCollection);
  };

  const handleGenerateReport = () => {
    if (filteredTeaCollection.length === 0) {
      alert("No data to print in report.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Tea Report", 15, 10);

    doc.autoTable({
      head: [['Tea ID', 'Name', 'Grade', 'Quantity', 'Added Date', 'Used']],
      body: filteredTeaCollection.map(tea => [
        tea.teaId,
        tea.teaName,
        tea.teaGrade,
        tea.quantityInStock,
        new Date(tea.addedDate).toLocaleDateString(),
        usedTeaCollection[tea.teaId] ? 'Yes' : 'No'
      ]),
    });

    doc.save('tea_report.pdf');
  };

  const handleUsedToggle = (teaId) => {
    setUsedTeaCollection(prevState => {
      const updatedStatus = { ...prevState, [teaId]: !prevState[teaId] }; // Toggle the used status
      localStorage.setItem('usedTeaCollection', JSON.stringify(updatedStatus)); // Update local storage immediately
      return updatedStatus; // Update state
    });
  };

  return (
    <div className="p-8">
      <Typography variant="h4" className="mb-10" align='center'>Tea Report</Typography>

      {/* Search Section */}
      <div className="mb-4">
        <TextField
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          error={searchError}
          helperText={searchError ? "Please enter a value to search." : ""}
          style={{ marginRight: '8px', flex: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>Search</Button>
        <Button variant="outlined" color="secondary" onClick={handleClear} style={{ marginRight: '10px' }}>Clear</Button>
        <Button variant="contained" color="success" onClick={handleGenerateReport}>Generate Report</Button>
      </div>

      {/* Sort Order Section */}
      <div className="mb-4">
        <Typography variant="body1" style={{ marginRight: '10px' }}>Sort by:</Typography>
        <Select value={sortOrder} onChange={handleSortChange} variant="outlined" style={{ minWidth: '150px' }}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
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
              <th className="py-2 px-4 text-left">Used</th>
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
                  <td className="py-2 px-4 border text-center">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: usedTeaCollection[tea.teaId] ? 'green' : 'red',
                        color: 'white',
                      }}
                      onClick={() => handleUsedToggle(tea.teaId)}
                    >
                      {usedTeaCollection[tea.teaId] ? 'Added' : 'Not Added'}
                    </Button>
                  </td>
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

export default TeaProduct;
