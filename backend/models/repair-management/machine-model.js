import mongoose from "mongoose";

const Schema = mongoose.Schema;

const machineSchema = new Schema(
    {
        name: String,
        id: String,
        status: String,
        location: String,
        description: String,
    },
    {
        timestamps: true,
    }
    );


const Machine = mongoose.model("Machine", machineSchema);

export { Machine };