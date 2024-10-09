import axios from "../../../services/axios";

const updateOrder = async (data, orderId, navigateTo) => {
  try {
    const response = await axios.put(`/orders/${orderId}`, data);
    if (response.status === 200) {
      alert('Order updated successfully');
      navigateTo('/admin/order/manage'); // Adjust the navigation path as necessary
    }
  } catch (error) {
    console.error("Error updating order:", error);
    alert("Failed to update the order");
  }
};

export default updateOrder;
