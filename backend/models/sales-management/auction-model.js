import mongoose from "mongoose";

const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    auID: String, 
    date: Date,
    productID: String,  // Added field for product ID
    buyer_id: [String], // Changed buyer_id to an array of strings
    status: String,
    meetingLink: String,
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("auction", auctionSchema);

export { Auction };
