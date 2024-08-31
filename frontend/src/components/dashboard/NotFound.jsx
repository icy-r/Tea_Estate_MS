import React from 'react';
import errorImg from '@assets/dashboard/404image.png';



const NotFound = () => {
   



    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 ">
            <div className="max-w-sm w-full">
                <img src={errorImg} alt="404 Error" className="w-full mb-4" />
                <h1 className="text-4xl sm:text-6xl font-bold text-color_focus">404 <span className='text-action'>ERROR</span></h1>
                <p className="text-lg sm:text-xl text-color_extra mt-2">OOPS! PAGE IS NOT FOUND</p>
                <button
                    onClick=" "
                    className="mt-6 px-6 py-2 bg-color_focus text-white rounded hover:bg-teal-600 transition-all"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};


export default NotFound;
