import {useEffect, useState} from "react";
import formEntryData from "../data-files/form-entry-data.js";
import createMachine from "../services/axios-create.js";

export default function Form() {
    const [formValues, setFormValues] = useState({
        item_id: '',
        name: '',
        type: '',
        driver_id: '',
        registration_number: ''
    });
    const [darkMode, setDarkMode] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);

        createMachine(formValues, setFormValues);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className='w-2/3 shadow rounded-md bg-white_modified flex flex-col  bg-opacity-55'>
            <div className='text-center font-bold text-2xl bg-color_extra py-5 rounded-sm'>
                Add new machine
            </div>
            <div className='p-5'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {formEntryData.map((data, index) => (
                            <div key={index}>
                                <label
                                    htmlFor={data.placeholder}
                                    className="block font-medium"
                                    style={{
                                        color: darkMode ? 'white' : 'black',
                                        fontSize: '1.3rem',
                                    }}
                                >
                                    {data.name}
                                </label>
                                <input
                                    id={data.placeholder}
                                    name={data.placeholder}
                                    value={formValues[data.placeholder]}
                                    onChange={handleChange}
                                    placeholder={data.placeholder}
                                    required={data.required}
                                    type={data.type}
                                    className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="p-3 flex gap-2 justify-end">
                        <button
                            className="bg-color_button text-white border shadow-md px-4 py-1 rounded-md"
                            style={{
                                fontSize: '1.5rem',
                                color: darkMode ? 'white' : 'black'
                            }}
                            type="submit"
                        >
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            className="bg-action text-white border shadow-md px-4 py-1 rounded-md"
                            onClick={() => setFormValues({
                                item_id: '',
                                name: '',
                                type: '',
                                driver_id: '',
                                registration_number: ''
                            })}
                        >
                            CLEAR FORM
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}