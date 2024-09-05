import React from 'react';
import tealeaves from '@assets/landingPage/tealeaves.png';
import lorry from '@assets/landingPage/lorry.png';
import estate from '@assets/landingPage/factoryIcon.png';
import { color_extra } from '@constants/colors';



const aboutCard = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4 py-3 md:px-32 text-center bg-white md:shadow-lg md:rounded-lg'>
                <div className='md:col-span-4 p-12 mb-6'>
                    <img src={tealeaves} alt='about' className='w-16 h-16 mb-6 object-cover mx-auto' />
                    <h3 className='text-3xl text-color_extra'>About</h3>
                    <p className='text-center'>
                        text text text
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div className='md:col-span-4 p-12'>
                    <img src={lorry} alt='about' className='w-16 h-16 mb-6 object-cover mx-auto' />
                    <h3 className='text-3xl text-color_extra'>About</h3>
                    <p className='text-center'>
                        text text text
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div className='md:col-span-4 p-12'>
                    <img src={estate} alt='about' className='w-16 h-16 mb-6 object-cover mx-auto' />
                    <h3 className='text-3xl text-color_extra'>About</h3>
                    <p className='text-center'>
                        text text text
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
        </>
    );
};

export default aboutCard;