import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const MaintenanceRequestSchema = new Schema({
  requestNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    },
  },
  requestType: {
    type: String,
    enum: ["repair", "maintenance"],
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed"],
    required: false,
  },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  description: { type: String, required: false },
  requestedBy: {
    employeeId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: false },
  },
  assignedTo: {
    technicianId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: false },
  },
  asset: {
    assetId: { type: Types.ObjectId, ref: "Asset", required: true },
    assetType: { type: String, enum: ["vehicle", "machinery"], required: true },
    assetName: { type: String, required: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date },
});

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  MaintenanceRequestSchema
);

export { MaintenanceRequest };
