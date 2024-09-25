import axios from "../../../services/axios.js";

const createMachine = (data, setvalue, method, model) => {
  let modelUrl;
  let param;

  if (model === "machines") {
    modelUrl = "/machines";
    param = data.item_id;
  } else if (model === "repairs") {
    modelUrl = "/repairs";
    param = data.request_id;
  }

  let result;
  if (method === "edit") {
    result = axios
      .put(`${modelUrl}/${param}`, data)
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
      .post(`${modelUrl}/`, data)
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
};

export default createMachine;