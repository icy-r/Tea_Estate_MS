import React from "react";

const linkings= [
  {
    name: "SEND US A MESSAGE",
    link: "#"
  }
];

const Footer = () => {
    return (
      <footer className="bg-color_focus text-white w-full bottom-0   relative ">
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
          <h1
            className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-medium
           md:w-2/5"
          >
            <span className="text-teal-400 ">TEA</span> will make your day Fresh!
          </h1>
          <div>
            <input
              type="text"
              placeholder="Enter Your Question"
              className="text-gray-800
             sm:w-72 w-full sm:mr-5 sm mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            />
             <button className="px-3 py-2  bg-color_button hover:bg-color_extra transition duration-200 rounded-sm">SEND TO US</button>
          
          </div>
        </div>
       
        <div
          className="text-center pt-2 text-gray-400 text-sm pb-8"
        >
          <span>© 2024 @ SLLIT  MADE WITH <span className="text-action" >LOVE</span></span>
          
        
        </div>
      </footer>
    );
  };
  
  export default Footer;
  