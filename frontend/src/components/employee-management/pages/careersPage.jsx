import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PublicVacancyTable from '../components/publicVacncyTable';
import SendPdf from './ApplicantAdd';

const CareerVacancy = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Page title */}
            <div className="w-full max-w-6xl text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Career Opportunities</h1>
                <p className="mt-2 text-lg text-gray-600">Explore our latest job openings and apply for a position that fits you!</p>
            </div>
            
            <div className="w-full max-w-6xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Vacancies Section */}
                <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Job Openings</h2>
                    <p className="text-gray-600 mb-6">Browse our open positions and find a career that suits your talents.</p>
                    <div className="overflow-x-auto">
                        <PublicVacancyTable />  {/* Render the table */}
                    </div>
                </div>

                {/* Application Form Section */}
                <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submit Your Application</h2>
                    <p className="text-gray-600 mb-6">Fill out the form and upload your resume to apply for a position.</p>
                    <div className="overflow-hidden">
                        <SendPdf />  {/* Render the form */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerVacancy;
