import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        invoice_Number: String,
        title: String,
        date: String,
        name: String,
        cid: String,
        address: String,
        telephone: String,
        email: String,
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