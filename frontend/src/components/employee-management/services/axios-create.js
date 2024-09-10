import axios from "../../../services/axios";

const createEmployee = (data, setvalue) =>{
    console.log(data);  
axios.post('/employees', data).then((response) => {
    //if response is successful
    response.status === 200 && alert('Employee added successfully');
    //reset the form
    setvalue({
        id: '',
        name: '',
        location: '',
        fertilizerSchedule: '',
        area: '',
        labour: [],
        cropStage: ''
    });
}).catch((error) => {
        alert(error);
    }
);
}

export default createEmployee;