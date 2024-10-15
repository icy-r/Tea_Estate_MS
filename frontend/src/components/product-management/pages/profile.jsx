import React, { useEffect, useState } from 'react';
import { Avatar, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios'; // Your axios service for API calls
import golden from '@assets/product/GOLDEN.jpg';
import op from '@assets/product/OP.jpg';
import NavigateButton from '../component/NavigateButton';

const Profile = () => {
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        console.log("Fetching buyer details...");
        const token = localStorage.getItem("buyerToken"); // Get the token from localStorage
        const buyerId = localStorage.getItem("buyerId");  // Get the buyer ID from localStorage (this should be set when logging in)

        if (!buyerId) {
          throw new Error("Buyer ID is missing");
        }

        const response = await axios.get(`/buyers/${buyerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if required
          },
        });
        console.log("Response data:", response.data); // Log response data
        setBuyer(response.data); // Set buyer details in state
      } catch (error) {
        console.error("Failed to fetch buyer details", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchBuyerDetails();
  }, []); // Only run once, since no hardcoded buyerId

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-500 h-20"></div>

      {/* Profile Section */}
      <div className="bg-white p-6 shadow-md mx-auto mt-[-40px] rounded-lg flex flex-col items-center justify-center w-2/4">
        {loading ? (
          <CircularProgress /> // Show loading spinner
        ) : (
          <>
            <Avatar
              src={buyer ? buyer.profilePicture : "https://i.pravatar.cc/150?img=3"}
              alt="Profile Picture"
              sx={{ width: 80, height: 80 }}
            />
            {buyer ? (
              <>
                <h2 className="mt-4 text-xl font-semibold">
                  {buyer.fName} {buyer.lName}
                </h2>
                <p className="text-gray-500">{buyer.email}</p>
                <p className="text-gray-500">{buyer.position}</p>
                <p className="text-gray-500">{buyer.company}</p>
                <Button
                  variant="contained"
                  sx={{ marginTop: '16px', backgroundColor: '#e0e0e0', color: '#000' }}
                  onClick={() => navigate(`/buyer/manageBuyer/${buyer._id}`)} // Use buyer._id dynamically
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              <p>Buyer information not available.</p>
            )}
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-evenly">
        <NavigateButton text="Quotations" path="/buyer/quotation/" />
        <NavigateButton text="Track Order" path="/buyer/ordertracking/" />
        <NavigateButton text="Order History" path="/buyer/orderhistory/" />
        <NavigateButton text="Wish List" path="/buyer/wishlist/" />
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-3 gap-4 mt-8 mx-8">
        <div className="bg-black-200 p-1 rounded-lg flex flex-col items-center">
          <img src={op} alt="Icon" className="w-50 h-50" />
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
          <div className="justify-center">
            <h3 className="text-center mt-2">BOPF</h3>
            <p className="text-center text-l text-gray-600">
              (Broken Orange Pekoe Fannings) is a popular grade of black tea known
              for its strong flavor and rich color.
            </p>
          </div>
        </div>
        <div className="bg-black-200 p-1 rounded-lg flex flex-col items-center">
          <img src={golden} alt="Icon" className="w-50 h-50" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
