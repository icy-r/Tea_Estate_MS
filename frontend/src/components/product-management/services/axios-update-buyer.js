import axios from "../../../services/axios";

const updateBuyer = async (data, navigateTo) => {
  try {
    
    const response = await axios.put(`/buyers/${data._id}`, data);
    
    // Check for successful response
    if (response.status === 200) {
      alert('Buyer updated successfully');
      navigateTo('/admin/buyer/ManageBuyer');
    }
  } catch (error) {
    console.error("Error updating buyer:", error);
    alert("Failed to update the buyer");
  }
};

export default updateBuyer;
