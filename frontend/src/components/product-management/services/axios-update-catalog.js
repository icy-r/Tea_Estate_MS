import axios from "../../../services/axios";

const updateCatalog = async (data, navigateTo) => {
  try {
    const response = await axios.put(`/catalog/${data._id}`, data);
    if (response.status === 200) {
      alert('Catalog updated successfully');
      navigateTo('/admin/catalog/ManageCatalog');
    }
  } catch (error) {
    console.error("Error updating catalog:", error);
// Check if error.response exists to handle server-side errors
    if (error.response) {
      alert(`Failed to update the catalog: ${error.response.data.message || 'Server error'}`);
    } else {
      alert("Failed to update the catalog. Please try again later.");
    }
  }
};

export default updateCatalog;
