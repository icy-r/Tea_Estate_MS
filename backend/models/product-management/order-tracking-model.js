import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderTrackingSchema = new Schema(
    {
        orderID: String,
        orderDate: String,
        orderStatus: String,
        orderTotal: number,
        orderPayment: String,
        orderItems: Array,
        orderCustomer: String,
        orderShipping: String,
        orderTracking: String,
    },
    {
        timestamps: true,
    }
    );

const OrderTracking = mongoose.model("OrderTracking", orderTrackingSchema);

export { OrderTracking };