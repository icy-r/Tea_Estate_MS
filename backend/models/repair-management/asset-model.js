import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const AssetSchema = new Schema({
  assetNumber: { type: String, required: true, unique: true },
  assetType: { type: String, enum: ["vehicle", "machinery"], required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  lastMaintenanceDate: { type: Date },
  nextScheduledMaintenance: { type: Date },
  status: {
    type: String,
    enum: ["operational", "under maintenance", "out of service"],
    required: true,
  },
  location: { type: String, required: true },
  maintenanceHistory: [
    {
      maintenanceId: { type: Types.ObjectId, ref: "MaintenanceRequest" },
      type: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true },
    },
  ],
});

const Asset = mongoose.model("Asset", AssetSchema);

export { Asset };
