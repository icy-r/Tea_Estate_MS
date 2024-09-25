import React from 'react';
import field from '@assets/landingPage/field.png';
import logo from '@assets/logo.png';

const FullHeightImageText = () => {
  return (
    <section className="relative w-full flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="lg:w-2/3 w-full h-2/3 lg:h-full">
        <img
          src= {field}  // Replace with the correct image path
          alt="Hotel Staff"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text Section */}
      <div className="lg:w-1/3 w-full h-1/3 lg:h-full flex items-center justify-center p-8">
        <div className="text-center lg:text-left">
          <div className="mb-4">
            <img
              src={logo} // Replace with the correct badge image path
              alt="Traveler Award"
              className="w-24 mx-auto lg:mx-0"
            />
          </div>
          <p className="text-gray-700 mb-4">
            Ceylon Tea Trails features in “Amazing Hotels: Life Beyond the Lobby,” the iconic BBC documentary television series. Rather than simply enjoying the luxury, the celebrity hosts Monica Galetti and Rob Rinder go behind the scenes to work alongside staff members and discover what it takes to operate such unique and high-end establishments.
          </p>
          <a href="#" className="font-semibold text-black">
            READ MORE &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default FullHeightImageText;
