import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FertilizerLogSchema = new Schema({
  scheduleId: { type: String, required: true },
  dateApplied: { type: Date, required: true },
  fertilizerType: { type: String, required: true },
  amount: { type: Number, required: true },
  fieldApplied: { type: String, required: true },
});

const FertilizerLog = mongoose.model("FertilizerLog", FertilizerLogSchema);

export { FertilizerLog };
