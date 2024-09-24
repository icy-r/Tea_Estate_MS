import React from 'react';

const SalesHome = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-6">
          <h2 className="text-xl font-semibold">Home</h2>
          <div className="flex items-center space-x-6">
            <button className="text-red-500 border-red-500 border px-4 py-2 rounded">Logout</button>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div> {/* Profile Picture */}
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="p-6 grid grid-cols-3 gap-6">
          {/* Generated Invoice Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">Generated Invoice</h3>
            <p className="text-4xl font-bold">39</p>
            <div className="h-2 bg-teal-400 rounded mt-2">
              <div className="bg-gray-400 w-1/2 h-full rounded"></div> {/* Progress Bar */}
            </div>
          </div>

          {/* Accepted Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">Accepted Orders</h3>
            <p className="text-4xl font-bold">35</p>
            <div className="h-2 bg-red-400 rounded mt-2">
              <div className="bg-gray-400 w-1/2 h-full rounded"></div> {/* Progress Bar */}
            </div>
          </div>

          {/* Declined Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">Declined Orders</h3>
            <p className="text-4xl font-bold">15</p>
            <div className="h-2 bg-teal-400 rounded mt-2">
              <div className="bg-gray-400 w-1/2 h-full rounded"></div> {/* Progress Bar */}
            </div>
          </div>
        </section>

        {/* Graph and Notices */}
        <section className="p-6 grid grid-cols-2 gap-6">
          {/* Sales Summary Graph */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Last Week Sales Summary</h3>
            {/* Placeholder for Bar Graph */}
            <div className="w-full h-64 bg-gray-200 rounded">
              {/* Use a charting library like Chart.js for real data */}
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Important Notices</h3>

            {/* Notice Item */}
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Sales Manager Avatar */}
                <p className="ml-2 font-semibold">Sales Manager</p>
              </div>
              <p className="text-gray-600">Please try to send the Order #247 quickly. Special Request by the customer</p>
              <a href="#" className="text-blue-500 font-semibold">Action</a>
            </div>

            {/* Another Notice Item */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Sales Manager Avatar */}
                <p className="ml-2 font-semibold">Sales Manager</p>
              </div>
              <p className="text-gray-600">Start Auction meeting at 11.00 a.m</p>
              <a href="#" className="text-blue-500 font-semibold">Action</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SalesHome;
