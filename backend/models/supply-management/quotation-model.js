import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for order supplies
const quotationSchema = new Schema({
    
  quotationId: {
    type:String,
    required: true
  },

  callingSupplyId:{
    type: String,
    required: true
  },

  supplierID:{
    type: String,
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

  price:{
    type: Number,
    required: true
  },

  status:{
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const Quotation = mongoose.model("Quotation", quotationSchema);

export { Quotation };
