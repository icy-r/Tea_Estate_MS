import { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';

const PublicVacancyTable = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/applicantRoles");
                if (!response.ok) {
                    throw new Error("Failed to fetch data from server");
                }
                const data = await response.json();
                console.log("Fetched data:", data);
                setVacancies(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vacancies data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    if (loading) {  
        return <p className="text-center my-4">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 my-4">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Vacancies</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left border border-gray-300">Title</th>
                            <th className="py-3 px-6 text-left border border-gray-300">Department</th>
                            <th className="py-3 px-6 text-left border border-gray-300">Location</th>
                            <th className="py-3 px-6 text-left border border-gray-300">Employment Type</th>
                            <th className="py-3 px-6 text-left border border-gray-300">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {vacancies.length > 0 ? (
                            vacancies.map((vacancy) => (
                                <tr key={vacancy._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 border border-gray-300">{vacancy.title}</td>
                                    <td className="py-3 px-6 border border-gray-300">{vacancy.department}</td>
                                    <td className="py-3 px-6 border border-gray-300">{vacancy.location}</td>
                                    <td className="py-3 px-6 border border-gray-300">{vacancy.employmentType}</td>
                                    <td className="py-3 px-6 border border-gray-300">{vacancy.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border border-gray-300 py-4 text-center">
                                    No vacancies available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublicVacancyTable;
