import Form from "../../divs/form/Form.jsx";
import { useState, useContext, createContext } from "react";

const FormContext = createContext(null);

const MaintenanceForm = () => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const form = useContext(FormContext);

    const handleChange = ({ target: { name, value } }) => {
        name === "date" ? setDate(value) : setDescription(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const formFields = [
        { name: "date", value: date, onChange: handleChange, type: "date", placeholder: "Date" },
        { name: "description", value: description, onChange: handleChange, type: "text", placeholder: "Description" }
    ];

    return (
        <FormContext.Provider value={form}>
            <Form formFields={formFields} handleChange={handleChange} handleSubmit={handleSubmit} />
        </FormContext.Provider>
    );
}

export default MaintenanceForm;