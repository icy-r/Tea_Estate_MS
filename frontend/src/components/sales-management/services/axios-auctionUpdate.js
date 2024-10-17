import axios from "../../../services/axios";

const updateAuction = async (data, auctionId, navigateTo) => {
  try {
    const response = await axios.put(`/auctions/${auctionId}`, data);
    if (response.status === 200) {
      alert('Auction updated successfully');
      navigateTo('/admin/sales/manageauctions'); // Adjust the navigation path as necessary
    }
  } catch (error) {
    console.error("Error updating auction:", error);
    alert("Failed to update the auction. Please try again.");
  }
};

export default updateAuction;
