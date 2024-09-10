import axios from "../../../services/axios.js";

const createMachine = (data, setvalue, method) => {
    if (method === 'edit') {
        axios.put(`/machines/${data.item_id}`, data).then((response) => {
            //if response is successful
            response.status === 200 && alert('Machine updated successfully');
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
        });
    } else {
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
        });
    }
}

export default createMachine;