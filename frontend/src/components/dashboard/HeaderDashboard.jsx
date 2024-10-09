import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "@assets/dashboard/profile.png";
import logo from "@assets/logo.png";
import * as authService from "../../services/auth-service.js";
import { UserContext } from "../../pages/Admin.jsx";
import axios from "../../services/axios.js";

const Header = ({ mainTitle, subTitle, toggleSidebar }) => {
  const navigate = useNavigate();
  const userC = useContext(UserContext);
  const { user, setUser } = userC;
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/notifications");
        console.log(response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.isRead) || [];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`notifications/${id}/read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md h-12 pr-4">
      {/* Left Section (Fixed width w-62) */}
      <div className="w-64 h-full bg-color_focus m-0 text-white pl-5 flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <h2 className="text-xs font-bold pl-2">TEA MANAGEMENT</h2>
      </div>

      {/* Middle Section (Remaining space, content aligned to the left) */}
      <div className="flex-grow flex items-center space-x-4 pl-4">
        <h1 className="text-xs">
          {mainTitle} &gt; <span className="text-action">{subTitle}</span>
        </h1>
      </div>

      {/* right notification */}
      <div className="flex items-center space-x-4 mr-4">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleNotificationClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadNotifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadNotifications.length}
            </span>
          )}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
              {isLoading ? (
                <p className="text-center py-2">Loading notifications...</p>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-2 hover:bg-gray-100 ${
                      notification.isRead ? "opacity-50" : ""
                    }`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <p className="text-sm font-semibold">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center py-2">No notifications</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Section (Logout and Profile Image) */}
      <div className="flex items-center space-x-4">
        <button
          className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
        <img
          src={profileImage}
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
