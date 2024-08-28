import mongoose from "mongoose";

const Schema = mongoose.Schema;

const maintenanceLogSchema = new Schema(
    {
        task_id: { type: Schema.Types.ObjectId, ref: "MaintenanceTask", required: true },
        technician_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        log_description: { type: String, required: true },
        log_date: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
    );

const MaintenanceLog = mongoose.model("MaintenanceLog", maintenanceLogSchema);

export { MaintenanceLog };