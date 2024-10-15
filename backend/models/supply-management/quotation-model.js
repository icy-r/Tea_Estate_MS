import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for order supplies
const quotationSchema = new Schema({
    
  quotationId: {
    type:String,
    required: false
  },

  callingSupplyId:{
    type: String,
    required: false
  },

  supplierID:{
    type: String,
    required: false
  },

  supplyType: {
    type: String,
    required: false
  },

  quantity: {
    type: Number,
    required: false
  },

  price:{
    type: Number,
    required: false
  },
  

  status:{
    type: String,
    required: false
  }

}, {
  timestamps: true
});

const Quotation = mongoose.model("Quotation", quotationSchema);

export { Quotation };
