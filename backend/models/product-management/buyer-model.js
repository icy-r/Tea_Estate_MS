import mongoose from "mongoose";

const Schema = mongoose.Schema;

const buyerSchema = new Schema(
    {
        fName: String,
        lName: String,
        position: String,
        company: String,
        companyAddress: String,
        telephone: String,
        email: String,
        password: String,
        confirmPassword: String,
    },
    {
        timestamps: true,
    }
    );

const Buyer = mongoose.model("Buyer", buyerSchema);

export { Buyer };