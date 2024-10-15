import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js'; // Adjust the import path as needed
import UpdateUtility from '../utilities/UpdateUtilities.jsx'; 
import DeleteUtility from '../utilities/DeleteUtilities.jsx';

const ReadUtilities = () => {
  const [utilitiesCollection, setUtilitiesCollection] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [utilityToDelete, setUtilityToDelete] = useState(null);

  // Fetch utility details from the API
  const fetchUtilityDetails = async () => {
    try {
      const response = await axios.get("/utilities/"); // Adjust the endpoint as needed
      console.log("Fetched utility data:", response.data); // Log response for debugging
      setUtilitiesCollection(response.data);
    } catch (error) {
      console.error("Error fetching utility data:", error.message); // Log error message
    }
  };

  useEffect(() => {
    fetchUtilityDetails(); // Call fetch function on component mount
  }, []);

  // Handle update button click
  const handleUpdate = (utility) => {
    setSelectedUtility(utility);
    setDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteOpen = (utility) => {
    setUtilityToDelete(utility);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of a utility item
  const handleDeleteConfirm = async () => {
    if (!utilityToDelete) return;
    try {
      await axios.delete(`/utilities/${utilityToDelete.utilityId}`); // Adjust the endpoint as needed
      alert("Utility item deleted successfully");
      setUtilitiesCollection(prevCollection => 
        prevCollection.filter((utility) => utility.utilityId !== utilityToDelete.utilityId)
      );
    } catch (error) {
      console.error("Error deleting utility item:", error.message); // Log error message
    }
    setDeleteDialogOpen(false);
    setUtilityToDelete(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Utility Inventory Management</h1>
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilitiesCollection.length > 0 ? (
              utilitiesCollection.map((utility) => (
                <tr key={utility.utilityId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{utility.utilityId}</td>
                  <td className="py-2 px-4 border">{utility.utilityName}</td>
                  <td className="py-2 px-4 border">{utility.utilityType}</td>
                  <td className="py-2 px-4 border">{utility.quantityInStock}</td>
                  <td className="py-2 px-4 border">{utility.dailyDistributionAmount}</td>
                  <td className="py-2 px-4 border">{utility.minimumLevel}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(utility)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDeleteOpen(utility)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No utility items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Utility Dialog */}
      <UpdateUtility
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setSelectedUtility(null); // Clear selected utility
        }}
        utility={selectedUtility} // Pass the selected utility to pre-fill the form
        fetchUtilityDetails={fetchUtilityDetails} // Pass fetchUtilityDetails to UpdateUtility
      />

      {/* Delete Utility Dialog */}
      <DeleteUtility
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)} // Close delete dialog
        handleConfirm={handleDeleteConfirm} // Confirm delete action
        utilityName={utilityToDelete ? utilityToDelete.utilityName : ''} // Pass the name of the utility to delete
      />
    </div>
  );
};

export default ReadUtilities;
