import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema
const saltRounds = 6

const employeeSchema = new Schema({
    firstName:{
      type:String,
      required:true,
    },

    lastName:{
      type:String,
      required:true,
    },

    Id:{
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

    gender:{
      type:String,
      required:true,
    }, 
    
    dateOfBirth:{
      type:String,
      required:true,
    },
    
    contactNo:{
      type:String,
      required:true,
    },

    designation:{
      type:String,
      required:true,
    },

    department:{
      type:String,
      required:true,
    },

    dateOfJoining:{
      type:String,
      required:true,
    },

    salary:{
      type:Number,
      required:true,
    },

    leavesLeft:{
      type:String,
      required:true,
    },

    address:{
      type:String,
      required:true,
    },













});

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee };