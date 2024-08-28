import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderID: String,
        orderDate: Date,
        quantity: String,
        pid: String,
        buyer_id: String, 
        saleID: String,
        status: String,
        
    },

    {
        timestamps: true,
    }
    );


const Order = mongoose.model("orders", orderSchema);

export { Order };