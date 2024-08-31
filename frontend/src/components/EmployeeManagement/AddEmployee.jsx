// src/App.js
import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left-side Navigation Bar */}

      <nav className="w-80 bg-white">
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow p-6">
        <div className="bg-teal-500 h-16 mb-4 rounded"></div>

        <header className="bg-white mb-4 rounded-lg ">
          <h1 className="text-2xl font-bold text-black ml-4">Employee Management</h1>
        </header>

        <div className="bg-teal-500 h-16 mb-1 rounded"></div>

        <main className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Add Employee</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* NIC */}
              <div>
                <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
                <input
                  id="nic"
                  type="text"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                  pattern="[A-Za-z0-9]{11,12}"
                  title="NIC should be alphanumeric with 11 to 12 characters"
                />
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  id="age"
                  type="number"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="18"
                  required
                  aria-required="true"
                  title="Age must be at least 18"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address. For example: user@example.com"
                  placeholder="user@example.com"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                  max="2024-08-30"
                  title="Date of Birth cannot be in the future"
                />
              </div>

              {/* Contact No */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact No</label>
                <input
                  id="contact"
                  type="tel"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                  pattern="[0-9]{10}"
                  title="Contact number should be 10 digits"
                />
              </div>

              {/* Designation */}
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  id="designation"
                  type="text"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  id="department"
                  type="text"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Address */}
              <div className="">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  id="address"
                  className="mt-2 block w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  required
                  aria-required="true"
                ></textarea> {/* Properly closed textarea */}
              </div>


              {/* Date of Joining */}
              <div>
                <label htmlFor="joining-date" className="block text-sm font-medium text-gray-700">Date of Joining</label>
                <input
                  id="joining-date"
                  type="date"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                  min="2024-08-30"
                  title="Date of Joining cannot be in the future"
                />
              </div>

            </div>

            <td className="p-3 flex gap-2">
              <button className="bg-color_button text-white border border-green-700 px-4 py-1 rounded">SUBMIT</button>
              <button className="bg-action text-white border border-red-800 px-4 py-1 rounded">CANCEL</button>
              <button className="bg-color_extra text-white border border-blue-600 px-4 py-1 rounded">CLEAR FORM</button>
            </td>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
