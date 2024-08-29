import mongoose from "mongoose";

// const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplySchema = new Schema (
{
    supplyId: String,
    quantity: Number,
    supplyType: String,
},
{
    timestamps: true, 
}
);



const Supply = mongoose.model("Supply", supplySchema);

export { Supply };