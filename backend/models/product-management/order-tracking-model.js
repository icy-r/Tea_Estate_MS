import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderTrackingSchema = new Schema(
    {
        order_id: { type: String, required: true },
        order_status: { type: String, required: true },
        order_date: { type: Date, required: true },
        order_ship_date: { type: Date, required: true },
        order_delivery_date: { type: Date, required: true },
        order_delivery_address: { type: String, required: true },
        order_tracking_number: { type: String, required: true },
        order_tracking_url: { type: String, required: true },
        order_tracking_status: { type: String, required: true },
        order_tracking_date: { type: Date, required: true },
        order_tracking_location: { type: String, required: true },
    },
    {
        timestamps: true,
    }
    );

const OrderTracking = mongoose.model("OrderTracking", orderTrackingSchema);

export { OrderTracking };