import React from 'react';

const AddSupplierForm = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">TEA ESTATE MANAGEMENT</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Home</a>
            </li>
            <li className="px-4 py-2">
              <span className="block font-semibold">Supply management</span>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Add Supply Type</a>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Manage Supply</a>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Receivings</a>
            </li>
            <li className="px-4 py-2">
              <span className="block font-semibold">Suppliers management</span>
            </li>
            <li className="ml-4 px-4 py-2 bg-teal-600">
              <a href="#" className="block">Add Supplier</a>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Handle Suppliers</a>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Get Supplier Stats</a>
            </li>
            <li className="ml-4 px-4 py-2 hover:bg-teal-600">
              <a href="#" className="block">Order supply</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 text-gray-700">
        <header className="flex justify-between items-center pb-6 border-b">
          <h2 className="text-2xl font-semibold">Suppliers Management</h2>
          <button className="text-red-500">LOGOUT</button>
        </header>

        <main className="mt-8">
          <h3 className="text-xl font-semibold text-red-400">Add Supplier</h3>

          {/* Form */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-8">
            <div className="mb-6">
              <h4 className="text-lg font-semibold">Supplier Details</h4>
            </div>
            <form className="grid grid-cols-2 gap-4">
              {/* Supplier Name */}
              <div className="flex flex-col">
                <label className="text-gray-600">Supplier Name</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Supply Type */}
              <div className="flex flex-col">
                <label className="text-gray-600">Supply Type</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label className="text-gray-600">Company Name</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Company Address */}
              <div className="flex flex-col">
                <label className="text-gray-600">Company Address</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* NIC */}
              <div className="flex flex-col">
                <label className="text-gray-600">NIC</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col">
                <label className="text-gray-600">Contact Number</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-600">Email</label>
                <input type="email" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              {/* Another Contact Number */}
              <div className="flex flex-col">
                <label className="text-gray-600">Contact Number</label>
                <input type="text" className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-teal-600">
                ADD
              </button>
              <button className="bg-blue-800 text-white font-semibold px-6 py-2 ml-4 rounded-md shadow hover:bg-blue-900">
                CLEAR
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSupplierForm;
