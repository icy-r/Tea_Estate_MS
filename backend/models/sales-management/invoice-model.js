import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        invoice_Number: String,
        title: String,
        date: String,
        name: String,
        id: String,
        address: String,
        phone: String,
        description: String,
        quantity: String,
        uni_price: String,
        subtotal: String,
        sales_tax: String,
        grand_total: String,

        

    },
    {
        timestamps: true,
    }
    );


const Invoice = mongoose.model("invoice", invoiceSchema);

export { Invoice };