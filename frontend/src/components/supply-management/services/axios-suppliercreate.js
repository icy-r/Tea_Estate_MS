import axios from "../../../services/axios.js";

const createSupplier = (data, setValues, method) => {
    if (method === 'edit') {
        axios.put(`/supplier/${data.id}`, data).then((response) => {
            // If response is successful
            if (response.status === 200) {
                alert('Supplier updated successfully');
            }
            // Reset the form
            setValues({
                id: '',
                fname: '',
                lname: '',
                nic: '',
                companyAddress: '',
                password: '',
                companyName: '',
                contactNum: '',
                email: ''
            });
        }).catch((error) => {
            alert(error);
        });
    } else {
        axios.post('/supplier/', data).then((response) => {
            // If response is successful
            if (response.status === 200) {
                alert('Supplier added successfully');
            }
            // Reset the form
            setValues({
                id: '',
                fname: '',
                lname: '',
                nic: '',
                companyAddress: '',
                password: '',
                companyName: '',
                contactNum: '',
                email: ''
            });
        }).catch((error) => {
            alert(error);
        });
    }
};

export default createSupplier;



