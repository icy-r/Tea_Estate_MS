import mongoose from "mongoose";

// const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const supplySchema = new Schema (
{
    supplyId: String,
    supplierId: String,
    supplierName: String,
    purchaseDate: Date,
    expirationDate: Date,
    quantity: Number,
    supplyType: String,

},
{
    timestamps: true, 
}
);

const Supply = mongoose.model("Supply", supplySchema);

export { Supply };
