import React from 'react';
import profileImage from '@assets/dashboard/profile.png';

const Header = ({ mainTitle, subTitle, toggleSidebar }) => {
    return (
        <div className="flex justify-between items-center p-2 bg-white shadow-md">
            < div className="flex space-x-4 justify-center align-middle">
            <button 
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
                </button>
                <h1 className="text-xs">
                    {mainTitle}klmcds &gt; <span className="text-action">{subTitle}</span>
                </h1>
            </div>

            <div className="flex items-center space-x-4">
      
                <button className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white">
                    LOGOUT
                </button>
                <img src={profileImage} alt="Profile" className="h-10 w-10 rounded-full" />
            </div>
        </div>
    );
};

export default Header;
