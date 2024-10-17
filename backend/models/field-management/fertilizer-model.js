import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
  id: { type: String, required: true },
  fieldName: { type: String, required: true },
  scheduleName: { type: String, required: true, unique: true },
  fertilizers: [
    {
      type: { type: String, required: true },
      applicationRate: { type: Number, required: true },
      defaultApplicationRate: { type: Number, required: true },
    },
  ],
  frequency: { type: String, required: true },
  //weatherAdjustment: { type: Boolean, default: false },
  lastFertilizationDate: { type: String, default: "NA" },
  nextFertilizationDate: { type: String, default: "NA" },
  totalPerFertilizer: [
    {
      type: { type: String },
      totalApplied: { type: Number, default: 0 }, // Total amount applied for each type
    },
  ],
});

const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);

export { Fertilizer };