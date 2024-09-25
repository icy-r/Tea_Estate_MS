import React from 'react';
import VehicleStatusPieChart from '../component/VehicleStatusPieChart.jsx';
import StatusMain from "../component/StatusMain.jsx";

const Home = () => {
    return (
        <div>
            <div className='full-width bg-color_extra h-32'>

            <StatusMain />
            </div>

            <div className='h-12'></div>

            <div className='row-span-3'>
                <div className='flex justify-center items-center'><button>schedule today</button></div>


            </div>
            <div className='h-12'><VehicleStatusPieChart/></div>
        </div>
    );
};

export default Home;