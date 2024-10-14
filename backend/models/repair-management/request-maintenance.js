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
    default: "maintenance",
    required: false, // Not mandatory
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed"],
    default: "pending",
    required: false, // Not mandatory
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: false, // Optional priority
  },
  description: { type: String, required: false }, // Description can be provided later if needed
  requestedBy: {
    employeeId: { type: Types.ObjectId, ref: "Employee", required: false }, // Optional requester details
    name: { type: String, required: false },
  },
  assignedTo: {
    technicianId: { type: Types.ObjectId, ref: "Employee", required: false }, // Optional assignment
    name: { type: String, required: false },
  },
  asset: {
    assetId: { type: Types.ObjectId, ref: "Asset", required: false }, // Optional asset details
    assetType: {
      type: String,
      enum: ["vehicle", "machinery"],
      default: "vehicle",
      required: false, // Default type is "vehicle"
    },
    assetName: { type: String, required: false },
  },
  createdAt: { type: Date, default: Date.now, immutable: true }, // Automatically set on creation
  updatedAt: { type: Date, default: Date.now }, // Automatically set to the current date on save
  completedAt: { type: Date }, // Set when the request is completed
});

// Automatically update the `updatedAt` field before saving the document
MaintenanceRequestSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  MaintenanceRequestSchema
);

export { MaintenanceRequest };
