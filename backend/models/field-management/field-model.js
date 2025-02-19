import mongoose from 'mongoose'

const Schema = mongoose.Schema

const fieldSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  location: {
    // Store location as coordinates (latitude and longitude)
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },

  fertilizerSchedule: {
    type: String,
    required: true,
    default: "none",
  },

  area: {
    type: Number,
    required: true,
  },

  labour: {
    type: String,
    required: true,
  },

  harvest_qnty: {
    type: Number,
    required: true,
    default: 0,
  },
  fieldStatus: {
    type: String,
    required: true,
    enum: ["Active", "Inactive", "Needs Maintenance", "In Progress"], // Define the possible statuses
    default: "Active",
  },
});

const Field = mongoose.model('Field', fieldSchema)

export { Field }