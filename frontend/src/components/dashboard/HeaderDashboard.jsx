import React from 'react';
import profileImage from '@assets/dashboard/profile.png';

const Header = ({ mainTitle, subTitle }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div>
                <h1 className="text-gray-600 text-xl">{mainTitle} &gt; <span className="text-red-500">{subTitle}</span></h1>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white">LOGOUT</button>
                <img src={profileImage} alt="Profile" className="h-10 w-10 rounded-full" />
            </div>
        </div>
    );
};

export default Header;
