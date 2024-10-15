import mongoose from "mongoose";

const Schema = mongoose.Schema;

const harvestLogSchema = new Schema(
  {
    date: { type: Date, required: true },
    logs: [
      {
        fieldName: { type: String, required: true },
        totalBest: { type: Number, required: true },
        totalGood: { type: Number, required: true },
        totalDamaged: { type: Number, required: true },
        totalAll: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const HarvestLog = mongoose.model("HarvestLog", harvestLogSchema);

export { HarvestLog };
