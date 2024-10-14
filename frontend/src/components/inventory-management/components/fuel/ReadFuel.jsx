import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import UpdateFuel from '../fuel/UpdateFuel.jsx'; 
import DeleteFuel from '../fuel/DeleteFuel.jsx';

const ReadFuel = () => {
  const [fuelCollection, setFuelCollection] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fuelToDelete, setFuelToDelete] = useState(null);

  // Fetch fuel details from the API
  const fetchFuelDetails = async () => {
    try {
      const response = await axios.get("/fuel/");
      setFuelCollection(response.data);
    } catch (error) {
      console.error("Error fetching fuel data:", error.message);
    }
  };

  useEffect(() => {
    fetchFuelDetails();
  }, []);

  // Handle update button click
  const handleUpdate = (fuel) => {
    setSelectedFuel(fuel);
    setDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteOpen = (fuel) => {
    setFuelToDelete(fuel);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of a fuel item
  const handleDeleteConfirm = async () => {
    if (!fuelToDelete) return;
    try {
      await axios.delete(`/fuel/${fuelToDelete.fuelId}`);
      alert("Fuel item deleted successfully");
      setFuelCollection(prevCollection => 
        prevCollection.filter((fuel) => fuel.fuelId !== fuelToDelete.fuelId)
      );
    } catch (error) {
      console.error("Error deleting fuel item:", error.message);
    }
    setDeleteDialogOpen(false);
    setFuelToDelete(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Fuel Inventory Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Fuel ID</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Daily Distribution</th>
              <th className="py-2 px-4 text-left">Minimum Level</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fuelCollection.length > 0 ? (
              fuelCollection.map((fuel) => (
                <tr key={fuel.fuelId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{fuel.fuelId}</td>
                  <td className="py-2 px-4 border">{fuel.fuelType}</td>
                  <td className="py-2 px-4 border">{fuel.quantityInStock}</td>
                  <td className="py-2 px-4 border">{fuel.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{fuel.minimumLevel}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(fuel)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDeleteOpen(fuel)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No fuel items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Fuel Dialog */}
      <UpdateFuel
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setSelectedFuel(null);
        }}
        fuel={selectedFuel}
        fetchFuelDetails={fetchFuelDetails} 
      />

      {/* Delete Fuel Dialog */}
      <DeleteFuel
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)} 
        handleConfirm={handleDeleteConfirm} 
        fuelType={fuelToDelete ? fuelToDelete.fuelType : ''} 
      />
    </div>
  );
};

export default ReadFuel;
