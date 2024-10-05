// UserProfile.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, LinearProgress } from '@mui/material';
import { NotificationsActive, ShoppingCart, LocalShipping, Favorite } from '@mui/icons-material';

const Profile = () => {
  const user = {
    name: "Subodhi Mihisarani",
    email: "Subodhi@example.com",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    notifications: [
      { id: 1, message: "Your order has been shipped!", time: "2 hours ago" },
      { id: 2, message: "You have a new promotional offer", time: "1 day ago" },
    ],
    orderHistory: [
      { id: 1, product: "Tea Set", price: "$25", date: "2024-09-20" },
      { id: 2, product: "Tea Leaves", price: "$15", date: "2024-09-18" },
    ],
    tracking: {
      status: "In transit",
      progress: 60,
    },
    wishlist: [
      { id: 1, product: "Ceramic Tea Pot", price: "$30" },
      { id: 2, product: "Green Tea Sampler", price: "$20" },
    ],
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-50">
      
      {/* Profile Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" color="textSecondary">{user.email}</Typography>
          <Button variant="outlined" color="primary">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Group Cards (Notifications, Order History, Order Tracking, Activity Log, Wishlist) */}
      <div className="flex flex-row flex-nowrap space-x-4 w-full max-w-7xl">
        {/* Notifications Card */}
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent>
            <div className="flex items-center justify-between">
              <Typography variant="h6">Notifications</Typography>
              <NotificationsActive color="primary" />
            </div>
            <div className="space-y-2 mt-4">
              {user.notifications.map(notification => (
                <div key={notification.id} className="flex justify-between">
                  <Typography variant="body2">{notification.message}</Typography>
                  <Typography variant="caption" color="textSecondary">{notification.time}</Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order History Card */}
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent>
            <div className="flex items-center justify-between">
              <Typography variant="h6">Order History</Typography>
              <ShoppingCart color="primary" />
            </div>
            <div className="space-y-2 mt-4">
              {user.orderHistory.map(order => (
                <div key={order.id} className="flex justify-between">
                  <Typography variant="body2">{order.product}</Typography>
                  <Typography variant="body2">{order.price}</Typography>
                  <Typography variant="caption" color="textSecondary">{order.date}</Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Tracking Card */}
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent>
            <div className="flex items-center justify-between">
              <Typography variant="h6">Order Tracking</Typography>
              <LocalShipping color="primary" />
            </div>
            <div className="mt-4">
              <Typography variant="body2">Status: {user.tracking.status}</Typography>
              <LinearProgress variant="determinate" value={user.tracking.progress} className="mt-2" />
              <Typography variant="caption" color="textSecondary">{user.tracking.progress}% completed</Typography>
            </div>
          </CardContent>
        </Card >

        {/* Wishlist Card */}
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent>
            <div className="flex items-center justify-between">
              <Typography variant="h6">Wishlist</Typography>
              <Favorite color="primary" />
            </div>
            <div className="space-y-2 mt-4">
              {user.wishlist.map(item => (
                <div key={item.id} className="flex justify-between">
                  <Typography variant="body2">{item.product}</Typography>
                  <Typography variant="body2">{item.price}</Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
