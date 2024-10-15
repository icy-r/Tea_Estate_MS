import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = ({ text, path }) => {
  const navigate = useNavigate(); 

  return (
    <button
      onClick={() => navigate(path)} 
      className="flex items-center bg-teal-500 text-white font-sans text-sm py-1 px-4 rounded-full hover:bg-teal-600 transition-all"
    >
      <span className="ml-2">{text}</span>
      <span className="ml-4 bg-red-400 rounded-full p-2 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
    </button>
  );
};

export default NavigateButton;
