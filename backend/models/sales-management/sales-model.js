import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salesSchema = new Schema(
    {
        saleID: String,
        date: Date,
        totalAmount: String,
        smID: String,
        inID : String,
        status: String,
        
    },

    {
        timestamps: true,
    }
    );


const Sales = mongoose.model("sales", salesSchema);

export { Sales };