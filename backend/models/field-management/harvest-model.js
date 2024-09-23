import mongoose from "mongoose";

const Schema = mongoose.Schema;

const harvestSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  field_name: {
    type: String,
    required: true,
  },
  good_qnty: {
    type: Number,
    required: true,
  },
  best_qnty: {
    type: Number,
    required: true,
  },
  damaged_qnty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  labour_name: {
    type: String,
    required: true,
  },

  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Harvest = mongoose.model('Harvest', harvestSchema)

export { Harvest }