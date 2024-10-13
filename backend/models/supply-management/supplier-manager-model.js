import mongoose from "mongoose";

// const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierManagerSchema = new Schema (
{
    id: String,
    name: String,
    nic:  String,
    age: Number,
    password: String,
    address: String,
    email: String,
    contactNum: String,
},
{
    timestamps: true, 
}
);


const SupplierManager = mongoose.model("SupplierManager", supplierManagerSchema);

export { SupplierManager };