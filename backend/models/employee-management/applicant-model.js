import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    Name:{
      type:String,
      required:true,
    },

    NIC:{
      type:String,
      required:true,
    },

    email:{
      type:String,
      required:true,
    },

    age:{
        type:Number,
        required:true,
      },

    address:{
      type:String,
      required:true,
    },

    dateOfBirth:{
      type:String,
      required:true,
    },

 

});

const Applicant = mongoose.model("Applicant", applicantSchema);

export { Applicant }