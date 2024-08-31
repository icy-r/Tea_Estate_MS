import StatusMain from "../StatusMain.jsx";
import Form from "../components/Form.jsx";
import {useState} from "react";

const Home = () => {
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className='flex flex-col gap-6 items-center'>
            <StatusMain />
            <Form value={value} handleChange={handleChange} />
        </div>
    );
}

export default Home;