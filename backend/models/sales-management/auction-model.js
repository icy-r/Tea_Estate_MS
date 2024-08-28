import mongoose from "mongoose";

const Schema = mongoose.Schema;

const auctionSchema = new Schema(
    {
        auID: String, 
        date: Date,
        buyer_id: String,
        status: String,

    },
    {
        timestamps: true,
    }
    );


const Auction = mongoose.model("auction", auctionSchema);

export { Auction };