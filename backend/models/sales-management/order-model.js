import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderID: { type: String, unique: true }, // Ensure orderID is unique
    orderDate: Date,
    quantity: String,
    productID: { type: Schema.Types.ObjectId, ref: 'Catalog' }, // Reference to Catalog model
    buyer_id: { type: Schema.Types.ObjectId, ref: 'Buyer' }, // Reference to Buyer model
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export { Order };
