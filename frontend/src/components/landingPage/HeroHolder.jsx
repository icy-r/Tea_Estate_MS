import { color } from 'framer-motion';
import React from 'react';

import Button from '@mui/material/Button';

const HeroTextStyle={
    fontSize: "5rem",
    textAlign:"center",
}

const HeroHolder = () => {
    return (
  
        <div 
        className=" h-80 absolute top-[30%] left-1/2 transform -translate-x-1/2"
        >
        <h1 className='text-white' style={HeroTextStyle}>Bio Tea Factory</h1>
        {/* <ActionButtonColor key={5} href={"#"} text={"Register"} className="h-5" /> */}
        </div>

       
        
   
    );
};

export default HeroHolder;