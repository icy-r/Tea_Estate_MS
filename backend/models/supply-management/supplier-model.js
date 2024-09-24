import mongoose from "mongoose";

// const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema (
{
    id: String ,
    fname: String,
    lname: String,
    nic: String,
    companyAddress: String,
    password: String,
    companyName: String,
    contactNum: String,
    email: String,
},
{
    timestamps: true, 
}
);



const Supplier = mongoose.model("Supplier", supplierSchema);

export { Supplier };