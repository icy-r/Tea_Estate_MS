import mongoose from "mongoose";

const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    auID: String, 
    date: Date,
    productID: { type: Schema.Types.ObjectId, ref: "Catalog" },  // Reference to Catalog model
    buyer_id: { type: Schema.Types.ObjectId, ref: "Buyer" },  // Reference to Buyer model
    status: String,
    meetingLink: String,
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

export { Auction };
