import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const ManageAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const navigateTo = useNavigate();
  const [buyers, setBuyers] = useState([]);

  // Fetch auctions from backend
  const fetchAuctions = async () => {
    try {
      const response = await axios.get('/auction/'); // Adjusted endpoint to match your API
      setAuctions(response.data);
      setFilteredAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  };

  // Fetch buyers from backend
  const fetchBuyers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/buyers'); // Adjust as necessary
      setBuyers(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };

  useEffect(() => {
    fetchAuctions();
    fetchBuyers();
  }, []);

  // Update filtered auctions based on search query
  useEffect(() => {
    setFilteredAuctions(
      auctions.filter((auction) =>
        auction.auID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (auction.productID && auction.productID.pid.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Array.isArray(auction.buyer_id) && auction.buyer_id.map(buyer => {
          const buyerDetails = buyers.find(b => b._id === buyer);
          return buyerDetails ? `${buyerDetails.fName} ${buyerDetails.lName}` : '';
        }).join(', ').toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, auctions, buyers]);

  // Handle update
  const handleUpdate = (auction) => {
    navigateTo(`/admin/sales/manageauctions/update/${auction._id}`, {
      state: {
        buyerId: auction.buyer_id, // Pass selected Buyer ID(s)
        productId: auction.productID ? auction.productID._id : '', // Pass selected Product ID
      },
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      try {
        await axios.delete(`/auction/${id}`);
        fetchAuctions(); // Refresh auctions after delete
      } catch (error) {
        console.error('Error deleting auction:', error);
      }
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Auction ID', 'Auction Date', 'Product ID', 'Buyer(s)', 'Status'];
    const tableRows = [];

    filteredAuctions.forEach(auction => {
      const auctionData = [
        auction.auID,
        new Date(auction.date).toLocaleDateString(), // Format the date if necessary
        auction.productID ? auction.productID.pid : 'N/A', // Accessing pid directly
        (Array.isArray(auction.buyer_id) && auction.buyer_id.length > 0
          ? auction.buyer_id.map(buyerId => {
            const buyer = buyers.find(b => b._id === buyerId);
            return buyer ? `${buyer.fName} ${buyer.lName}` : 'Unknown Buyer';
          }).join(', ')
          : 'N/A'), // Adjust for buyer object structure
        auction.status,
      ];
      tableRows.push(auctionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Auction Report', 14, 15);
    doc.save('Auction_Report.pdf');
  };

  return (
    <div className="flex flex-col p-8">
      <h2 className="text-2xl font-semibold text-center">Manage Auctions</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2"
        />
        <button onClick={exportToPDF} className="bg-teal-500 text-white px-4 py-2 rounded">
          Export to PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Auction ID</th>
              <th className="border px-4 py-2">Auction Date</th>
              <th className="border px-4 py-2">Product ID</th>
              <th className="border px-4 py-2">Buyer(s)</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuctions.map((auction) => (
              <tr key={auction._id}>
                <td className="border px-4 py-2">{auction.auID}</td>
                <td className="border px-4 py-2">{new Date(auction.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{auction.productID ? auction.productID.pid : 'N/A'}</td>
                <td className="border px-4 py-2">
                  {Array.isArray(auction.buyer_id) && auction.buyer_id.length > 0
                    ? auction.buyer_id.map(buyerId => {
                      const buyer = buyers.find(b => b._id === buyerId);
                      return buyer ? `${buyer.fName} ${buyer.lName}` : 'Unknown Buyer';
                    }).join(', ')
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2">{auction.status}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleUpdate(auction)} className="text-blue-500">Update</button>
                  <button onClick={() => handleDelete(auction._id)} className="text-red-500 ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAuctions;
