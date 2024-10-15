import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    Name:{
      type:String,
      required:true,
    },

    Reason:{
      type:String,
      required:true,
    },

    DateFrom:{
      type:String,
      required:true,
    },

    DateTo:{
        type:String,
        required:true,
      },

    Email:{
      type:String,
      required:true,
    },

    type:{
      type:String,
      required:true
    },

    status:{
      type:String,
      required:false
    }
});

const Leave = mongoose.model("Leave", leaveSchema);

export { Leave }