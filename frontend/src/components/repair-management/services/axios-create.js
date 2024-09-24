import axios from "../../../services/axios.js";

const createMachine = (data, setvalue, method) => {
    let result;
    if (method === "edit") {
      result = axios
        .put(`/machines/${data.item_id}`, data)
        .then((response) => {
          //if response is successful
          response.status === 200;
          //reset the form
          setvalue({
            item_id: "",
            name: "",
            type: "",
            driver_id: "",
            registration_number: "",
          });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      result = axios
        .post("/machines/", data)
        .then((response) => {
          //if response is successful
          response.status === 200;
          //reset the form
          setvalue({
            item_id: "",
            name: "",
            type: "",
            driver_id: "",
            registration_number: "",
          });
        })
        .catch((error) => {
          alert(error);
        });
    }

    return result;
}

export default createMachine;