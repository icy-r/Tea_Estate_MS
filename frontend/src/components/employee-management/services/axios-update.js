import axios from "../../../services/axios";

const updateEmployee = async (data, navigateTo) => {
  try {
    const response = await axios.put(`/employees/${data.id}`, data);
    if (response.status === 200) {
      alert('Employee Data updated successfully');
      navigateTo('/admin/field/manage');
    }
  } catch (error) {
    console.error("Error updating Employee:", error);
    alert("Failed to update Employee Data");
  }
};

export default updateEmployee;
