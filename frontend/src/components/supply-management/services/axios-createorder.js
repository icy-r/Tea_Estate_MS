import axios from "../../../services/axios.js";

const orderSupply = (data, setValue) => {
    // Prepare the order data to be sent
    const orderData = {
        supplierId: data.supplierId, // Ensure this matches your input structure
        supplyType: data.supplyType,
        quantity: data.quantity,
        additionalConditions: data.additionalConditions || "" // Default to empty if not provided
    };

    // Make the POST request to create a new order supply
    axios.post('/order/', orderData)
        .then((response) => {
            // If response is successful
            if (response.status === 201) {
                alert('Order created successfully');
            }
            // Reset the form
            setValue({
                supplierId: '',
                supplyType: '',
                quantity: '',
                additionalConditions: ''
            });
        })
        .catch((error) => {
            alert(error.response?.data?.error || 'Error creating order');
        });
};

export default orderSupply;
