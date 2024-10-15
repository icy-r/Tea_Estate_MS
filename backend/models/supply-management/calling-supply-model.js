import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for calling supplies
const callingSupplySchema = new Schema({
    
  callingSupplyId:String,
  supplyType:String,
  quantity:Number,
  status:String,
  qnumber:Number,

}, 
{
  timestamps: true
}
);

const CallingSupply = mongoose.model("CallingSupply", callingSupplySchema);

export { CallingSupply };
