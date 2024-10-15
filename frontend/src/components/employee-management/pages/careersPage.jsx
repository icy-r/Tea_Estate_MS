import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PublicVacancyTable from '../components/publicVacncyTable';
import SendPdf from './ApplicantAdd';

const CareerVacancy = () => {
    return (
        <div className="min-h-screen h-screen bg-#ebe7e7 flex flex-col items-center py-4 px-4 lg:px-6 overflow-hidden">
            {/* Page title */}
            <div className="w-full max-w-7xl text-center mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Career Opportunities</h1>
                <p className="mt-1 text-sm lg:text-base text-gray-600">Explore our latest job openings and apply for a position that fits you!</p>
            </div>
            
            <div className="w-full max-w-1xl grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-full">
                {/* Vacancies Section */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 lg:p-6 h-full overflow-hidden">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-1">Current Job Openings</h2>
                    <p className="text-xs lg:text-sm text-gray-600 mb-4">Browse our open positions and find a career that suits your talents.</p>
                    <div className="overflow-y-auto h-[calc(100%-60px)]"> {/* Adjusted to fit the height */}
                        <PublicVacancyTable />  {/* Render the table */}
                    </div>
                </div>

                {/* Application Form Section */}
                <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 h-full overflow-hidden">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-1">Submit Your Application</h2>
                    <p className="text-xs lg:text-sm text-gray-600 ">Fill out the form and upload your resume to apply for a position.</p>
                    <div className="overflow-hidden">
                        <SendPdf />  {/* Render the form */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerVacancy;
