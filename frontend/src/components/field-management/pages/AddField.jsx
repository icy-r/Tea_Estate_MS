import React, { useState } from 'react';

const AddField = () => {
    const [fieldName, setFieldName] = useState('');

    const handleInputChange = (e) => {
        setFieldName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
    };

    return (
        <div>
            <h1>Add Field</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fieldName">Field Name:</label>
                <input
                    type="text"
                    id="fieldName"
                    value={fieldName}
                    onChange={handleInputChange}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddField;