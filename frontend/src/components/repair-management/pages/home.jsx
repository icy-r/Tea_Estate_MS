import StatusMain from "../components/StatusMain.jsx";
import ErrorBoundary from "../../ErrorBoundary.jsx";
// import Form from "../components/Form.jsx";
// import {useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import DataDisplay from "../components/DataDisplay.jsx";

const Home = () => {
    // const [value, setValue] = useState('');
    const navigate = useNavigate();
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };
    return (
        <div className='flex flex-col gap-6 items-center'>
            <ErrorBoundary>
                <StatusMain/>
            </ErrorBoundary>
            <Button variant="contained" color="primary">
                Add new machine
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/admin/repair/all');
            }}>
                Show all machines
            </Button>
            <DataDisplay/>
            {/*<Form value={value} handleChange={handleChange} />*/}
        </div>
    );
}

export default Home;