import React from 'react';
import { Avatar, Button } from '@mui/material';
import golden from '@assets/product/GOLDEN.jpg';
import op from '@assets/product/OP.jpg';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-500 h-20"></div>

      {/* Profile Section */}
      
      <div className="bg-white p-6 shadow-md mx-8 mt-[-40px] rounded-lg flex flex-col items-center justify-center w-2/4">
      <Avatar
          src="https://i.pravatar.cc/150?img=3"
          alt="Profile Picture"
          sx={{ width: 80, height: 80 }}
        />
        <h2 className="mt-4 text-xl font-semibold">MIHISARANI A K S</h2>
        <p className="text-gray-500">subodhi@gmail.com</p>
        <Button
          variant="contained"
          sx={{ marginTop: '16px', backgroundColor: '#e0e0e0', color: '#000' }}
        >
          Edit Profile
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-evenly">
        <Button variant="outlined">Notification</Button>
        <Button variant="outlined">Track Order</Button>
        <Button variant="outlined">Order History</Button>
        <Button variant="outlined">Wish List</Button>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-3 gap-4 mt-8 mx-8">
        <div className="bg-black-200 p-1 rounded-lg flex flex-col items-center">
          <img src={op} alt="Icon" className="w-50 h-50" />
          
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
          <div className='justify-center'>
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
