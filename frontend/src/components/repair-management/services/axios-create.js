import axios from "../../../services/axios.js";

const createMachine = (data, setvalue) =>
axios.post('/machines/', data).then((response) => {
    //if response is successful
    response.status === 200 && alert('Machine added successfully');
    //reset the form
    setvalue({
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

export default createMachine;