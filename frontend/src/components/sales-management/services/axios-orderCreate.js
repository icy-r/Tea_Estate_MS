import axios from "../../../services/axios";

const createOrder = (data, setValue) => {
  console.log(data);
  axios.post('/orders', data)
    .then((response) => {
      // If response is successful
      if (response.status === 200) {
        alert('Order added successfully');
        // Reset the form
        setValue({
          orderID: '',
          orderDate: '',
          quantity: '',
          pid: '',
          buyer_id: '',
          saleID: '',
          status: ''
        });
      }
    })
    .catch((error) => {
      alert("Failed to add order: " + error.message);
    });
}

export default createOrder;
