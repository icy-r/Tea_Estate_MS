import mongoose from "mongoose";
const Schema = mongoose.Schema;

const labourSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: String, required: true },
  role: { type: String, required: true },
  assignedField: { type: String, required: true },
  harvest_qnty: { type: Number, required: true },
  // Add other attributes if needed
});

const Labour = mongoose.model('Labour', labourSchema);

export { Labour };
