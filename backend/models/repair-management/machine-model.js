import mongoose from "mongoose";

const Schema = mongoose.Schema;

const machineModelSchema = new Schema(
    {
        item_id: { type: Number, required: true,},
        m_status: { type: String, enum: ["Active", "Inactive", "Repair"], required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        // assigned_driver_id: { type: Schema.Types.ObjectId, ref: 'User' },
        driver_id: { type: String, required: true },
        registration_number: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const MachineModel = mongoose.model("MachineModel", machineModelSchema);

export { MachineModel };