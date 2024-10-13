import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for order supplies
const orderSupplySchema = new Schema({
    
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // Referencing the Supplier model
    required: true
  },

  supplyType: {
    type: String,
    enum: ['fertilizer', 'chemicals', 'fuel'], // Supply types
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  additionalConditions: {
    type: String
  }
}, {
  timestamps: true
});

const OrderSupply = mongoose.model("OrderSupply", orderSupplySchema);

export { OrderSupply };
