import axios from "../../../services/axios";

const createInvoice = (data, setValue) => {
    console.log(data);  
    axios.post('/invoices', data).then((response) => {
        // If response is successful
        if (response.status === 200) {
            alert('Invoice added successfully');
            // Reset the form
            setValue({
                invoice_Number: '',
                title: '',
                date: '',
                name: '',
                id: '',
                address: '',
                phone: '',
                description: '',
                quantity: 1,
                uni_price: 0,
                subtotal: 0,
                sales_tax: 0.15,  // Adjust as necessary
                grand_total: 0,
            });
        }
    }).catch((error) => {
        console.error("Error creating invoice:", error);
        alert("Failed to add the invoice");
    });
}

export default createInvoice;
