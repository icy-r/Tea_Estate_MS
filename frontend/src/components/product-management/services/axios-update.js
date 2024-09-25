import axios from "../../../services/axios";

const updatecatalog = async (data, navigateTo) => {
  try {
    const response = await axios.put(`/catalogs/${data.id}`, data);
    if (response.status === 200) {
      alert('Catalog updated successfully');
      navigateTo('/admin/catalog/manage');
    }
  } catch (error) {
    console.error("Error updating catalog:", error);
    alert("Failed to update the catalog");
  }
};

export default updatecatalog;