import React from 'react';
import { white_modified } from '@constants/colors';
import { color_extra } from '@constants/colors';



const aboutCard = () => {
    return (
        <>

        
           <div className='grid grid-cols-1 md:grid-cols-12 gap-4 py-10  md:px-80'
                style={{
                    backgroundColor: white_modified,
                    borderRadius:'30px',
                    backdropFilter: 'blur(10px)',
                
                }}
           >
               <div className='md:col-span-4  p-12 '>
                <h3 className='font-xl' style={{color: color_extra,fontSize:'40px'}}>About</h3>
                 <p className=''>
                             text text text
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                 </p>
                </div>
                <div className='md:col-span-4 p-12'>
                <h3 className='font-xl' style={{color: color_extra,fontSize:'40px'}}>About</h3>
                 <p className='e'>
                             text text text
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                 </p>
                </div>
                <div className='md:col-span-4 p-12'>
                <h3 className='font-xl' style={{color: color_extra,fontSize:'40px'}}>About</h3>
                        <p className=''>
                             text text text
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc id aliquam
                     </p>
                </div>
            </div>
        </>
 
    );
};

export default aboutCard;