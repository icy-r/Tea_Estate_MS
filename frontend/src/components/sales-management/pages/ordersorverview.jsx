import React from "react";


const OrdersOverview = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Orders Overview</h2>
          <button className="text-red-500 border border-red-500 px-4 py-2 rounded">
            LOGOUT
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Orders in Last 7 Months Chart */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold mb-4">Orders got in last 7 months</h3>
            <div>
              {/* Chart Placeholder */}
              <img
                src="chart-placeholder.png"
                alt="Orders in Last 7 Months"
                className="w-full h-40"
              />
            </div>
          </div>

          {/* Sales Growth in 2024 Chart */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold mb-4">Sales Growth in 2024</h3>
            <div>
              {/* Chart Placeholder */}
              <img
                src="chart-placeholder.png"
                alt="Sales Growth in 2024"
                className="w-full h-40"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white p-4 shadow rounded">
          <table className="w-full text-left">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="p-2">Order_ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Customer Name</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Rows */}
              <tr className="border-t">
                <td className="p-2">OI968</td>
                <td className="p-2">
                  <span className="bg-teal-100 text-teal-800 py-1 px-3 rounded-full text-xs">Accepted</span>
                </td>
                <td className="p-2">05/10/2024</td>
                <td className="p-2">Damro Pvt</td>
                <td className="p-2">
                  <button className="text-red-500 border border-red-500 px-2 py-1 rounded mr-2">DELETE</button>
                  <button className="text-teal-500 border border-teal-500 px-2 py-1 rounded">EDIT</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">OI967</td>
                <td className="p-2">
                  <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs">Declined</span>
                </td>
                <td className="p-2">06/10/2024</td>
                <td className="p-2">Damro Pvt</td>
                <td className="p-2">
                  <button className="text-red-500 border border-red-500 px-2 py-1 rounded mr-2">DELETE</button>
                  <button className="text-teal-500 border border-teal-500 px-2 py-1 rounded">EDIT</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">OI965</td>
                <td className="p-2">
                  <span className="bg-teal-100 text-teal-800 py-1 px-3 rounded-full text-xs">Accepted</span>
                </td>
                <td className="p-2">05/10/2024</td>
                <td className="p-2">Damro Pvt</td>
                <td className="p-2">
                  <button className="text-red-500 border border-red-500 px-2 py-1 rounded mr-2">DELETE</button>
                  <button className="text-teal-500 border border-teal-500 px-2 py-1 rounded">EDIT</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersOverview;
