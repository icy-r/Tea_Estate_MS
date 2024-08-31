import axios from "../../../services/axios";

const createField = (data, setvalue) =>{
    console.log(data);  
axios.post('/fields', data).then((response) => {
    //if response is successful
    response.status === 200 && alert('Field added successfully');
    //reset the form
    setvalue({
        id: '',
        name: '',
        location: '',
        fertilizerSchedule: '',
        area: '',
        labour: '',
        cropStage: ''
    });
}).catch((error) => {
        alert(error);
    }
);
}

export default createField;