import axios from "../../../services/axios.js";

const createSupply = (data, setvalue, method) => {
    if (method === 'edit') {
        axios.put(`/supplies/${data.supplyId}`, data).then((response) => {
            // If response is successful
            if (response.status === 200) {
                alert('Supply updated successfully');
            }
            // Reset the form
            setvalue({
                supplyId: '',
                quantity: '',
                supplyType: ''
            });
        }).catch((error) => {
            alert(error);
        });
    } else {
        axios.post('/supplies/', data).then((response) => {
            // If response is successful
            if (response.status === 200) {
                alert('Supply added successfully');
            }
            // Reset the form
            setvalue({
                supplyId: '',
                quantity: '',
                supplyType: ''
            });
        }).catch((error) => {
            alert(error);
        });
    }
}

export default createSupply;
