import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import UpdateFert from '../fertilizer/UpdateFert.jsx'; 
import DeleteFert from '../fertilizer/DeleteFert.jsx';

const ReadFert = () => {
  const [fertCollection, setFertCollection] = useState([]);
  const [selectedFert, setSelectedFert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fertToDelete, setFertToDelete] = useState(null);

  // Fetch fertilizer details from the API
  const fetchFertDetails = async () => {
    try {
      const response = await axios.get("/fert/");
      console.log("Fetched fertilizer data:", response.data);
      if (Array.isArray(response.data)) {
        setFertCollection(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching fertilizer data:", error.message);
    }
  };

  useEffect(() => {
    fetchFertDetails(); // Call fetch function on component mount
  }, []);

  // Handle update button click
  const handleUpdate = (fert) => {
    setSelectedFert(fert);
    setDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteOpen = (fert) => {
    setFertToDelete(fert);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of a fertilizer item
  const handleDeleteConfirm = async () => {
    if (!fertToDelete) return;
    try {
      await axios.delete(`/fert/${fertToDelete.fertilizerId}`);
      alert("Fertilizer item deleted successfully");
      setFertCollection(prevCollection => 
        prevCollection.filter((fert) => fert.fertilizerId !== fertToDelete.fertilizerId)
      );
    } catch (error) {
      console.error("Error deleting fertilizer item:", error.message);
    }
    setDeleteDialogOpen(false);
    setFertToDelete(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Fertilizer Inventory Management</h1>
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fertCollection.length > 0 ? (
              fertCollection.map((fert) => (
                <tr key={fert.fertilizerId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{fert.fertilizerId}</td>
                  <td className="py-2 px-4 border">{fert.fertilizerName}</td>
                  <td className="py-2 px-4 border">{fert.fertilizerType}</td>
                  <td className="py-2 px-4 border">{fert.quantityInStock}</td>
                  <td className="py-2 px-4 border">{fert.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{fert.minimumLevel}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(fert)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDeleteOpen(fert)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No fertilizer items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Fertilizer Dialog */}
      <UpdateFert
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setSelectedFert(null); // Clear selected fertilizer
        }}
        item={selectedFert} // Change to 'item' to match UpdateFert's expected prop
        fetchFertDetails={fetchFertDetails} // Pass fetchFertDetails to UpdateFert
      />

      {/* Delete Fertilizer Dialog */}
      <DeleteFert
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)} // Close delete dialog
        handleConfirm={handleDeleteConfirm} // Confirm delete action
        fertilizerName={fertToDelete ? fertToDelete.fertilizerName : ''} // Pass the name of the fertilizer to delete
      />
    </div>
  );
};

export default ReadFert;
