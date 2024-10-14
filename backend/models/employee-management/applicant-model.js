import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    name:{
      type:String,
      required:true,
    },

    nic:{
      type:String,
      required:true,
    },

    email:{
      type:String,
      required:true,
    },

    file: {
      type: String,
      required: true
    }

});

const Applicant = mongoose.model("Applicant", applicantSchema);

export { Applicant }