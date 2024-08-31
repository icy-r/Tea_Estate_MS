import mongoose from "mongoose";

const Schema = mongoose.Schema;

const labourSchema = new Schema({
    id: {
        type: String,
        required: true
    },
   
    assignedField: {
        type: String,
        required: true
    },

    harvest_qnty: {
        type: Number,
        required: true
    },

    emp_id:{
        type: String,
        required: true
    },
    });

const Labour = mongoose.model('Labour', labourSchema)

export { Labour }