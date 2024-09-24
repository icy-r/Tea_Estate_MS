import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const GenerateReports = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  const inventoryTypes = ['Tea', 'Fertilizer', 'Fuel', 'Utilities'];

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/inventory/");
      setInventory(response.data);
      setFilteredInventory(response.data); // Initialize with all inventory
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSearch = () => {
    let results = inventory;

    // Filter by type
    if (selectedType) {
      results = results.filter(item => item.type === selectedType);
    }

    setFilteredInventory(results);
  };

  const handleClear = () => {
    setSelectedType('');
    setFilteredInventory(inventory); // Reset to all items
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Generate Reports</h1>

      {/* Search Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FormControl variant="outlined" size="medium" style={{ marginRight: '10px', minWidth: 200 }}>
          <InputLabel id="select-type-label">Select Type</InputLabel>
          <Select
            labelId="select-type-label"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            label="Select Type"
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            {inventoryTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{
            marginRight: '10px',
            background: 'rgba(0, 0, 0, 0.38)',
            boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Inventory ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Purchase Date</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.inventoryId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{item.inventoryId}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.type}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className="py-2 px-4 border">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{item.minLevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No inventory items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateReports;
