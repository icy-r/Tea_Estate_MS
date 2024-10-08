import { useEffect, useState } from 'react';
import axios from "../../../services/axios.js";
import { useParams, useNavigate } from 'react-router-dom';

const VacanciesTable = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Initializing vacancies as an object, as your initial state suggests it's a single vacancy
    const [vacancy, setVacancy] = useState({
        title: '',
        department: '',
        location: '',    
        employmentType: '',
        description: ''
    });

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const response = await axios.get(`/applicantRoles/`); // API call to fetch data for the vacancy
                if (response.data) {
                    console.log("vacency",response.data);
                    setVacancy(response.data);  // Set the fetched vacancy data to state
                } else {
                    console.error("Vacancy not found.");
                }
            } catch (error) {
                console.error("Error fetching vacancy data:", error); // Handle any API errors
            }
        };

        if (id) {
            fetchVacancy(); // Fetch vacancy data when the `id` is available
        }
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Vacancy Details</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Employment Type</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Display the single vacancy data */}
                        <tr className="bg-white hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{vacancy.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{vacancy.department}</td>
                            <td className="border border-gray-300 px-4 py-2">{vacancy.location}</td>
                            <td className="border border-gray-300 px-4 py-2">{vacancy.employmentType}</td>
                            <td className="border border-gray-300 px-4 py-2">{vacancy.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VacanciesTable;
