import React from 'react';

function OrderDetails() {
  const orders = [
    { auctionId: 'AI2021', orderId: 'OI556', date: '05/10/2024', customerName: 'Damro Pvt' },
    { auctionId: 'AI2022', orderId: 'OI556', date: '06/10/2024', customerName: 'Damro Pvt' },
    { auctionId: 'AI2023', orderId: 'OI556', date: '05/10/2024', customerName: 'Damro Pvt' },
    { auctionId: 'AI2024', orderId: 'OI556', date: '10/10/2024', customerName: 'Damro Pvt' },
    { auctionId: 'AI2025', orderId: 'OI556', date: '11/10/2024', customerName: 'Damro Pvt' },
    { auctionId: 'AI2026', orderId: 'OI556', date: '11/10/2024', customerName: 'Damro Pvt' },
  ];

  return (
    <div className="flex justify-center"> {/* Wrapper for main layout */}
      {/* Main Content */}
      <div className="w-4/5 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <button className="text-red-600 border border-red-600 px-4 py-2 rounded-md">LOGOUT</button>
        </div>
        
        {/* Table Section */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="py-3 px-4">Auction_ID</th>
              <th className="py-3 px-4">Order_ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-2 px-4">{order.auctionId}</td>
                <td className="py-2 px-4">{order.orderId}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">{order.customerName}</td>
                <td className="py-2 px-4 flex justify-center space-x-4">
                  <button className="text-red-600 border border-red-600 px-4 py-1 rounded-md">DELETE</button>
                  <button className="text-teal-600 border border-teal-600 px-4 py-1 rounded-md">EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Download Report Button */}
        <div className="mt-8">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md flex items-center">
            <span className="inline-block mr-2">📄</span> Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
