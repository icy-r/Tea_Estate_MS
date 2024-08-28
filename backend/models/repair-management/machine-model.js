import mongoose from "mongoose";

const Schema = mongoose.Schema;

const machineModelSchema = new Schema(
    {
        item_id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        type: { type: String, enum: ['Machine', 'Vehicle'], required: true },
        assigned_driver_id: { type: Schema.Types.ObjectId, ref: 'User' },
        registration_number: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const MachineModel = mongoose.model("MachineModel", machineModelSchema);

export { MachineModel };