import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateAuction from '../services/axios-auctionUpdate.js'; // Ensure this service is implemented correctly

const UpdateAuction = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  
  // Check if location.state exists and has auction data
  const auction = location.state?.auction; 

  // Handle case where auction is not found
  if (!auction) {
    return <div>Error: Auction data not available</div>;
  }

  // Ensure buyer_id is an array
  const initialBuyerId = Array.isArray(auction.buyer_id) ? auction.buyer_id : [];

  const [auctionData, setAuctionData] = useState({
    auID: auction.auID,
    date: auction.date,
    productID: auction.productID,
    buyer_id: initialBuyerId, // Initialize as an array
    status: auction.status,
    meetingLink: auction.meetingLink,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle buyer_id differently since it's a comma-separated string
    if (name === 'buyer_id') {
      setAuctionData({ ...auctionData, [name]: value.split(',').map(buyer => buyer.trim()) }); // Convert back to array
    } else {
      setAuctionData({ ...auctionData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(auctionData);

    try {
      await updateAuction(auctionData, auction._id); // Pass the auction ID to the update function
      alert('Auction updated successfully!');
      navigateTo('/admin/sales/manageauctions'); // Navigate to ManageAuctions after successful update
    } catch (error) {
      alert('Error updating auction. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Auction</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="auID"
            value={auctionData.auID}
            onChange={handleChange}
            placeholder="Auction ID"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <input
            name="date"
            type="date"
            value={auctionData.date.substring(0, 10)} // Format the date
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="productID"
            value={auctionData.productID}
            onChange={handleChange}
            placeholder="Product ID"
            disabled
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="buyer_id"
            value={auctionData.buyer_id.join(', ')} // Displaying buyer IDs as a comma-separated string for editing
            onChange={handleChange}
            placeholder="Buyer IDs (comma-separated)"
            disabled
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="status"
            value={auctionData.status}
            onChange={handleChange}
            placeholder="Status"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="meetingLink"
            value={auctionData.meetingLink}
            onChange={handleChange}
            placeholder="Meeting Link"
            disabled
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
            Update Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAuction;
