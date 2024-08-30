import React from "react";
import TextField from '@mui/material/TextField';

const Test = () => {
    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <div className='h-100 w-80 bg-gray-200 p-4'>
                <div>
                    <TextField id="first-name" label="First Name" fullWidth />
                </div>
                <br />
                <div>
                    <TextField id="last-name" label="Last Name" fullWidth />
                </div>
                <br />
                <div>
                    <TextField id="company-name" label="Company Name" fullWidth />
                </div>
                <br />
                <div>
                    <TextField id="company-address" label="Company Address" fullWidth />
                </div>
                <br />
                <div>
                    <TextField id="email" label="Email" fullWidth />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md
                 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 my-5">Submit </button>

            </div>
        </div>
    );
};

export default Test;
