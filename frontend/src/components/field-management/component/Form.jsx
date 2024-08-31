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
        <div className='w-1/2 shadow bg-color_extra bg-opacity-55'>
            <h2 className='text-center font-bold text-2xl'>
                Add New Field
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {formEntryData.map((data, index) => (
                    <FormControl key={index} className='flex flex-col gap-2'>
                        <FormLabel
                            required={data.required}
                            className="text-sm p-4"
                            style={{
                                fontSize: '1.5rem',
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
                        />
                    </FormControl>
                ))}
                <div>
                    <button
                        className='bg-color_button text-white p-2 rounded-md mt-4'
                        style={{
                            fontSize: '1.5rem',
                            color: darkMode ? 'white' : 'black'
                        }}
                        type={'submit'}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}