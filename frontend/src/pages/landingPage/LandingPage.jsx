import React from "react";
import Hero from "@assets/landingPage/Hero.png";
import Header from "@components/navbar/Header.jsx";
import AboutCard from "@components/landingPage/AboutCard.jsx";
import Footer from "@components/footer/Footer.jsx"
import FullHeightImageText from "@components/landingPage/FullHeightImageText.jsx";
import BlogSection from "@components/landingPage/BlogSection.jsx";
import DualSideCardRightImage from "@components/landingPage/DualSideCardRightImage";
import Partnership from "@components/landingPage/Partnership";
import ActionButtonColor from "@components/divs/ActionButtonColor.jsx";
import HeroHolder from "@components/landingPage/HeroHolder.jsx";
import "./landingPageStyles.css"


const heroStyle={
    backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "80vh",
    
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

        <div className="lg:px-28 px-10  about-section ">
           <AboutCard/>
        </div>

        <div className="md:mt-80 ">
           
            <DualSideCardRightImage/>
        </div>
        
        <div className="mb-14">
            <BlogSection/>
        </div>
        <div className="mb-16">   
            <FullHeightImageText/>
        </div>

        <div className="px-64 hidden lg:block ">
            <Partnership/>
        </div>

        <div>
            <Footer/>
        </div>

        </>
    );
}

export default LandingPage;