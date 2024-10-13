import React, { useEffect, useState } from 'react';
import axios from '../../../../services/axios.js';
import UpdateTea from '../tea/UpdateTea.jsx'; 
import DeleteTea from '../tea/DeleteTea.jsx';

const ReadTea = () => {
  const [teaCollection, setTeaCollection] = useState([]);
  const [selectedTea, setSelectedTea] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teaToDelete, setTeaToDelete] = useState(null);

  // Fetch tea details from the API
  const fetchTeaDetails = async () => {
    try {
      const response = await axios.get("/tea/");
      console.log("Fetched tea data:", response.data); // Log response for debugging
      setTeaCollection(response.data);
    } catch (error) {
      console.error("Error fetching tea data:", error.message); // Log error message
    }
  };

  useEffect(() => {
    fetchTeaDetails(); // Call fetch function on component mount
  }, []);

  // Handle update button click
  const handleUpdate = (tea) => {
    setSelectedTea(tea);
    setDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteOpen = (tea) => {
    setTeaToDelete(tea);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of a tea item
  const handleDeleteConfirm = async () => {
    if (!teaToDelete) return;
    try {
      await axios.delete(`/tea/${teaToDelete.teaId}`);
      alert("Tea item deleted successfully");
      setTeaCollection(prevCollection => 
        prevCollection.filter((tea) => tea.teaId !== teaToDelete.teaId)
      );
    } catch (error) {
      console.error("Error deleting tea item:", error.message); // Log error message
    }
    setDeleteDialogOpen(false);
    setTeaToDelete(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Tea Inventory Management</h1>
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teaCollection.length > 0 ? (
              teaCollection.map((tea) => (
                <tr key={tea.teaId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{tea.teaId}</td>
                  <td className="py-2 px-4 border">{tea.teaName}</td>
                  <td className="py-2 px-4 border">{tea.teaGrade}</td>
                  <td className="py-2 px-4 border">{tea.quantityInStock}</td>
                  <td className="py-2 px-4 border">{new Date(tea.addedDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{tea.minimumLevel}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(tea)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDeleteOpen(tea)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No tea items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Tea Dialog */}
      <UpdateTea
            open={dialogOpen}
            handleClose={() => {
                setDialogOpen(false);
                setSelectedTea(null); // Clear selected tea
            }}
            item={selectedTea}  // Use 'item' as the prop name
            fetchTeaDetails={fetchTeaDetails} // Pass fetchTeaDetails to UpdateTea
        />

      {/* Delete Tea Dialog */}
      <DeleteTea
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)} // Close delete dialog
        handleConfirm={handleDeleteConfirm} // Confirm delete action
        teaName={teaToDelete ? teaToDelete.teaName : ''} // Pass the name of the tea to delete
      />
    </div>
  );
};

export default ReadTea;
