import React from 'react';
import VehicleStatusPieChart from '../component/VehicleStatusPieChart.jsx';
import ManageVehicleGraph from '../component/ManageVehicleDept.jsx';
import StatusMain from "../component/StatusMain.jsx";

const Home = () => {
    return (
        <div>
            <div className='full-width bg-color_extra h-32'>
                <StatusMain />
            </div>

            <div className='h-12'></div>

            <div className='row-span-3 flex justify-center items-center'>
                <button>Schedule Today</button>
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
