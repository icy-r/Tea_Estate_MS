import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const MaintenanceRequestSchema = new Schema({
  requestNumber: { type: String, required: true },
  requestType: {
    type: String,
    enum: ["repair", "maintenance"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed"],
    required: true,
  },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  description: { type: String, required: true },
  requestedBy: {
    employeeId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  assignedTo: {
    technicianId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  asset: {
    assetId: { type: Types.ObjectId, ref: "Asset", required: true },
    assetType: { type: String, enum: ["vehicle", "machinery"], required: true },
    assetName: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date },
});
mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);

export { MaintenanceRequestSchema };
