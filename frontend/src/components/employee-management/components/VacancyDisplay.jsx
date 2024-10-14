import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; // MUI components for confirmation dialog
import axios from '../../../services/axios.js';
const URL = "/applicantRoles/";

const VacancyTable = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null); 
    const [open, setOpen] = useState(false); 

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/applicantRoles");
                if (!response.ok) {
                    throw new Error("Failed to fetch data from server");
                }
                const data = await response.json();
                console.log("Fetched data:", data);
                setVacancies(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vacancies data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    if (loading) {  
        return <p className="text-center my-4">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 my-4">Error: {error}</p>;
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${URL}/${deleteId}`);
            // Update the vacancy list after deletion
            setVacancies((prevVacancies) => prevVacancies.filter(vacancy => vacancy._id !== deleteId)); // Use _id here
            console.log("Deleted vacancy with ID:", deleteId);
            setOpen(false); // Close the dialog
        } catch (error) {
            console.error("There was an error deleting the vacancy!", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpen(true); // Open the confirmation dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog without deleting
    };

    return (
      <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">Vacancy Details</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                  <tr style={{ backgroundColor: '#1AACAC' }} className="text-white uppercase text-sm leading-normal">                          <th className="py-3 px-6 text-left border border-gray-300">Title</th>
                          <th className="py-3 px-6 text-left border border-gray-300">Department</th>
                          <th className="py-3 px-6 text-left border border-gray-300">Location</th>
                          <th className="py-3 px-6 text-left border border-gray-300">Employment Type</th>
                          <th className="py-3 px-6 text-left border border-gray-300">Description</th>
                          <th className="py-3 px-6 text-left border border-gray-300">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                      {vacancies.length > 0 ? (
                          vacancies.map((vacancy) => (
                              <tr key={vacancy._id} className="border-b border-gray-200 hover:bg-gray-100">
                                  <td className="py-3 px-6 border border-gray-300">{vacancy.title}</td>
                                  <td className="py-3 px-6 border border-gray-300">{vacancy.department}</td>
                                  <td className="py-3 px-6 border border-gray-300">{vacancy.location}</td>
                                  <td className="py-3 px-6 border border-gray-300">{vacancy.employmentType}</td>
                                  <td className="py-3 px-6 border border-gray-300">{vacancy.description}</td>
                                  <td className="py-3 px-6 flex space-x-2 border border-gray-300">
                                      <button 
                                          className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                          onClick={() => handleDelete(vacancy._id)} // Pass _id here
                                      >
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="6" className="border border-gray-300 py-4 text-center">
                                  No vacancies available.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>

              {/* Delete Confirmation Dialog */}
              <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="delete-confirmation-dialog"
                  aria-describedby="delete-confirmation-description"
              >
                  <DialogTitle id="delete-confirmation-dialog">
                      {"Confirm Deletion"}
                  </DialogTitle>
                  <DialogContent>
                      <DialogContentText id="delete-confirmation-description">
                          Are you sure you want to delete this vacancy? This action cannot be undone.
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={handleConfirmDelete} color="error" autoFocus>
                          Delete
                      </Button>
                  </DialogActions>
              </Dialog>
          </div>
      </div>
  );

};

export default VacancyTable;
