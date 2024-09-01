import { FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState } from "react";
import formEntryData from "../data-files/form-entry-data.js";
import createField from "../services/axios-create.js";

export default function Form() {
    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        location: '',
        fertilizerSchedule: '',
        area: '',
        labour: '',
        cropStage: ''
    });
    const [darkMode, setDarkMode] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);

        createField(formValues, setFormValues);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
                {/* Form Section */}
                <div className="w-2/3 bg-white p-8 justify-center">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Fertilizer Schedule Details
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {formEntryData.map((data, index) => (
                            <FormControl key={index} className="flex flex-col">
                                <FormLabel
                                    required={data.required}
                                    className="text-sm"
                                    style={{
                                        fontSize: '1rem',
                                        color: darkMode ? 'white' : 'black'
                                    }}
                                >
                                    {data.name}
                                </FormLabel>
                                <Input
                                    name={data.placeholder}
                                    value={formValues[data.placeholder]}
                                    onChange={handleChange}
                                    placeholder={data.placeholder}
                                    required={data.required}
                                    type={data.type}
                                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </FormControl>
                        ))}
                        <div className="flex justify-between">
                            <button
                                className="bg-teal-500 text-white p-2 rounded-md w-1/3"
                                style={{
                                    fontSize: '1rem',
                                    color: darkMode ? 'white' : 'black'
                                }}
                                type={'submit'}
                            >
                                ADD
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded-md w-1/3"
                                style={{
                                    fontSize: '1rem',
                                    color: darkMode ? 'white' : 'black'
                                }}
                                type="button"
                                onClick={() => setFormValues({
                                    id: '',
                                    name: '',
                                    location: '',
                                    fertilizerSchedule: '',
                                    area: '',
                                    labour: '',
                                    cropStage: ''
                                })}
                            >
                                CLEAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
