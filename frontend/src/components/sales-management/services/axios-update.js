import axios from "../../../services/axios";

const updateInvoice = async (data, navigateTo) => {
  try {
    const response = await axios.put(`/invoices/${data.invoiceId}`, data); // Adjust the endpoint according to your API
    if (response.status === 200) {
      alert('Invoice updated successfully');
      navigateTo('/admin/invoice/manage'); // Redirect to the invoice management page
    }
  } catch (error) {
    console.error("Error updating invoice:", error);
    alert("Failed to update the invoice");
  }
};

export default updateInvoice;
