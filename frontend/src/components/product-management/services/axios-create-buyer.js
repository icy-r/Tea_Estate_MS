import axios from "../../../services/axios";

const createBuyer = (data, setvalue) =>{
    console.log(data);
    axios.post('/buyers', data).then((response) => {
        //if response is successful
        response.status === 200 && alert('Buyer added successfully');
        //reset the form
        setvalue({
            bId: "",
            fName: "",
            lName: "",
            position: "",
            company: "",
            companyAddress: "",
            telephone: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    }).catch((error) => {
            alert(error);
        }
    );

}

export default createBuyer;