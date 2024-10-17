import React from 'react';

import OrderPie from '../components/orderPieChart';


const Home = () => {
  return (
    <div>
      
     
      <OrderPie />

      {/* Important Notices */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="font-semibold mb-4">Important Notices</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div  className="mr-2 text-gray-400" />
            <div>
              <p className="font-semibold">Sales Manager</p>
              <p className="text-sm text-gray-600">
                Please try to send the Order #247 quickly. Special Request by the customer
              </p>
              <a href="#" className="text-blue-500 text-sm">ACTION</a>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-2 text-gray-400" />
            <div>
              <p className="font-semibold">Sales Manager</p>
              <p className="text-sm text-gray-600">Start Auction meeting at 11.00 a.m</p>
              <a href="#" className="text-blue-500 text-sm">ACTION</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
