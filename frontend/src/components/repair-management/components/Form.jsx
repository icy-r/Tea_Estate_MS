import { FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "../../../services/axios.js";

const formdataentry = [
    { name: 'Machine ID', required: true, placeholder: 'item_id', type: 'number' },
    { name: 'Machine Name', required: true, placeholder: 'name', type: 'text' },
    { name: 'Machine Type', required: true, placeholder: 'type', type: 'text' },
    { name: 'Driver ID', required: true, placeholder: 'driver_id' , type: 'text'},
    { name: 'Registration Number', required: true, placeholder: 'registration_number', type: 'text'}
];

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
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);

        axios.post('/machines/', formValues).then((response) => {
            //if response is successful
            response.status === 200 && alert('Machine added successfully');
            //reset the form
            setFormValues({
                item_id: '',
                name: '',
                type: '',
                driver_id: '',
                registration_number: ''
            });
        }).catch((error) => {
            alert(error);
        }
        );

    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div style={{ width: '50%' }}>
            <h2 className='text-center font-bold text-2xl'>
                Add new machine
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {formdataentry.map((data, index) => (
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