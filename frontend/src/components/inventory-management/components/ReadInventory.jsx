import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';
import UpdateInventory from './UpdateInventory.jsx';
import DeleteInventory from './DeleteInventory.jsx'; // Import the DeleteInventory component

const ReadInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog
  const [itemToDelete, setItemToDelete] = useState(null); // State to hold item for deletion

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/inventory/");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDeleteOpen = (item) => {
    setItemToDelete(item); // Set the item to delete
    setDeleteDialogOpen(true); // Open the delete dialog
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(`/inventory/${itemToDelete.inventoryId}`);
      alert("Inventory item deleted successfully");
      setInventory(inventory.filter((item) => item.inventoryId !== itemToDelete.inventoryId));
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
    setDeleteDialogOpen(false); // Close the delete dialog
    setItemToDelete(null); // Clear the item to delete
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Inventory Management</h1>
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.inventoryId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{item.inventoryId}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.type}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className="py-2 px-4 border">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{item.minLevel}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button 
                      className="bg-teal-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded-md" 
                      onClick={() => handleDeleteOpen(item)} // Open delete dialog
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No inventory items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Update Inventory Dialog */}
      <UpdateInventory
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          setSelectedItem(null); // Clear selected item
        }}
        item={selectedItem}
        fetchDetails={fetchDetails} // Pass fetchDetails to UpdateInventory
      />

      {/* Delete Inventory Dialog */}
      <DeleteInventory
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)} // Close delete dialog
        handleConfirm={handleDeleteConfirm} // Confirm delete action
        itemName={itemToDelete ? itemToDelete.name : ''} // Pass the name of the item to delete
      />
    </div>
  );
};

export default ReadInventory;
