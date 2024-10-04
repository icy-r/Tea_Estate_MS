import React from 'react';
import VehicleStatusPieChart from '../component/VehicleStatusPieChart.jsx';
import ManageVehicleGraph from '../component/ManageVehicleDept.jsx';
import StatusMain from "../component/StatusMain.jsx";
import axios from "../../../services/axios.js";

const Home = () => {

      // Function to handle button click and trigger the backend function
  const handleSubmit = async () => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post('/transportLog/');

      // Handle success
      if (response.status === 200) {
        alert('Transport logs scheduled successfully.');
      } else {
        alert('Failed to schedule transport logs.');
      }
    } catch (error) {
      // Handle error
      console.error('Error scheduling transport logs:', error);
      alert('Error scheduling transport logs.');
    }
  };




    return (
        <div>
            <div className='full-width bg-color_extra h-32'>
                <StatusMain />
            </div>

            <div className='h-12'></div>
            <div className="row-span-3 flex justify-center items-center">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-color_button font-semibold rounded-lg  hover:bg-color_extra transition duration-300 ease-in-out focus:outline-none "
                >
                    Schedule Today
                </button>
            </div>

            <div className='h-12'></div>
            
            {/* Displaying charts without additional height */}
            <div className='flex pr-3'>
                <div className='w-100 md:w-1/3 lg:w-1/3 p-2 shadow-md mr-3 ml-3'>
                    <VehicleStatusPieChart />
                </div>
                <div className='w-100 md:w-1/3 lg:w-2/3 p-2 shadow-sm'>
                    <ManageVehicleGraph />
                </div>
            </div>
        </div>
    );
};

export default Home;
