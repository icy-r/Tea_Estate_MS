import React from 'react';
import About from '@assets/landingPage/about.png';
import Logo from '@assets/logo.png';
import {white_modified} from '@constants/colors';


const imgBg={
    backgroundImage:`url(${About})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
   
    
}


const DualSideCardRightImage = () => {
    return (
        <div className='w-full md:px-[20%] grid grid-cols-1 md:grid-cols-2 bg- mb-20 '>
            <div className='bg-white_modified md:col-span-1  h-auto p-12' >
            <div className='flex items-center'>
                <img className='h-6 w-7' src={Logo} alt="Company Logo" />
                <h1 className='text-2xl ml-2 p-2 '>COMPANY</h1>
            </div>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>

            </div>
            <div  className=' md:col-span-1 h-full' style={imgBg}></div>
        </div>


    );
};

export default DualSideCardRightImage; 