import axios from "../../../services/axios";

const createCatalog = (data, setvalue) =>{
    console.log(data);
    axios.post('/catalogs', data).then((response) => {
        //if response is successful
        response.status === 200 && alert('Catalog added successfully');
        //reset the form
        setvalue({
            quality: "",   
            quantity: "",
            unitPrice: "",
            description: "",
            aucDate: "",
            aucTime: "",
            image: "",
        });
    }).catch((error) => {
            alert(error);
        }
    );

}

export default createCatalog;