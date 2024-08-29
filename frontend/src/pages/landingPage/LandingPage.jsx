import React from "react";
import Hero from "@assets/landingPage/Hero.png";
import Header from "@components/navbar/Header.jsx";
import ActionButtonColor from "@components/divs/ActionButtonColor.jsx";
import HeroHolder from "@components/landingPage/HeroHolder.jsx";


const heroStyle={
    backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
}


function LandingPage() {
    return (
        <>
        <div
            style={heroStyle}
            
        >
           <Header /> 

            <div className="flex w-full justify-between h-dvh">
               <HeroHolder />
            </div>
         
        </div>
        <div className="h-50">

        </div>

        </>
    );
}

export default LandingPage;