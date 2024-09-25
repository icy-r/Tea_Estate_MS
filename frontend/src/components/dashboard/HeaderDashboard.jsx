import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import profileImage from '@assets/dashboard/profile.png';
import logo from '@assets/logo.png';
import * as authService from "../../services/auth-service.js";
import {UserContext} from "../../pages/Admin.jsx";
import { io } from "socket.io-client";

const Header = ({mainTitle, subTitle, toggleSidebar}) => {
  const navigate = useNavigate();
  const userC = useContext(UserContext);
  const { user, setUser } = userC;

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  // //socket.io frontend
  // const socket = io("ws://localhost:3001", {
  //   transports: ["websocket"],
  //   auth: {
  //     token: "123",
  //   },
  // });
  // socket.on("connect", () => {
  //   console.log("connected to socket.io server");
  // });
  return (
    <div className="flex justify-between items-center bg-white shadow-md h-12 pr-4">
      {/* Left Section (Fixed width w-62) */}
      <div className="w-64 h-full bg-color_focus m-0 text-white pl-5 flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <h2 className="text-xs font-bold pl-2">TEA MANAGEMENT</h2>
      </div>

      {/* Middle Section (Remaining space, content aligned to the left) */}
      <div className="flex-grow flex items-center space-x-4 pl-4">
        {/* <button
                    onClick={toggleSidebar}
                    className="text-action border border-action px-4 py-1 rounded hover:bg-action hover:text-white">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button> */}
        <h1 className="text-xs">
          {mainTitle} &gt; <span className="text-action">{subTitle}</span>
        </h1>
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