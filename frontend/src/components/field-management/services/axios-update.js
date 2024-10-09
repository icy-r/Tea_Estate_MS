import axios from "../../../services/axios";

const updateField = async (data) => {
  try {
    const response = await axios.put(`/fields/${data.id}`, data);
    if (response.status === 200) {
      return { success: true, message: "Field updated successfully" };
    }
  } catch (error) {
    console.error("Error updating field:", error);
    return { success: false, message: "Failed to update the field" };
  }
};

export default updateField;
