import axios from "../../../services/axios";

const updateField = async (data, navigateTo) => {
  try {
    const response = await axios.put(`/fields/${data.id}`, data);
    if (response.status === 200) {
      alert('Field updated successfully');
      navigateTo('/admin/field/manage');
    }
  } catch (error) {
    console.error("Error updating field:", error);
    alert("Failed to update the field");
  }
};

export default updateField;
