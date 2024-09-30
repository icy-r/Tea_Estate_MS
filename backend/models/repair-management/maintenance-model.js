import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const MaintenanceScheduleSchema = new mongoose.Schema({
  assetId: { type: ObjectId, required: true },
  scheduledDate: { type: Date, required: true },
  maintenanceType: { type: String, required: true },
  description: { type: String, required: true },
  assignedTechnician: {
    technicianId: { type: ObjectId, required: true },
    name: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "postponed"],
    required: true,
  },
  completionDate: Date,
  notes: String,
});

const MaintenanceSchedule = mongoose.model(
  "MaintenanceSchedule",
  MaintenanceScheduleSchema
);

export { MaintenanceSchedule };
