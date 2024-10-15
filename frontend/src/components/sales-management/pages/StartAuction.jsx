import React from 'react';
// Import the auction images
import auctionImage from "../../../assets/sales/auction.png";


const StartAuctionPage = () => {
  const zoomMeetingLink = "https://us05web.zoom.us/j/89246140524?pwd=55Vb5cCr6EJtarp25c0xn7YrVzzauf.1";

  // Handle the click event for starting the auction
  const handleStartAuction = () => {
    window.location.href = zoomMeetingLink;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Start Auction</h1>
      {/* Display the auction image */}
      <img
        src={auctionImage} 
        alt="Auction Icon"
        className="w-64 h-64 mb-8"
      />
      <button
        onClick={handleStartAuction}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Start Auction
      </button>
    </div>
    </div>
  );
};

export default StartAuctionPage;
