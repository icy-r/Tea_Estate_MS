import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuctionPage = ({ auctionId }) => {
  const [buyerIds, setBuyerIds] = useState([]);
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleStartAuction = async () => {
    try {
      const response = await fetch('/api/auction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: productId,
          buyer_id: buyerIds,
        }),
      });

      const data = await response.json();
      if (data.meetingLink) {
        navigate(`/auction-meeting/${auctionId}`);
      }
    } catch (error) {
      console.error('Error starting auction:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Start Auction</h1>

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mb-4 px-4 py-2 border border-black rounded-md"
        />

        <input
          type="text"
          placeholder="Buyer IDs (comma separated)"
          value={buyerIds.join(',')}
          onChange={(e) => setBuyerIds(e.target.value.split(','))}
          className="mb-4 px-4 py-2 border border-black rounded-md"
        />

        <button
          onClick={handleStartAuction}
          className="px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          Start Auction
        </button>
      </div>
    </div>
  );
};

export default AuctionPage;
