import mongoose from "mongoose";

const Schema = mongoose.Schema;

const harvestSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    field_id: {
        type: String,
        required: Schema.Types.ObjectId, ref: 'Field'
    },
    good_qnty:{
        type: Number,
        required: true
    },
    best_qnty:{
        type: Number,
        required: true
    },
    damaged_qnty:{
        type: Number,
        required
    },
    date: {
        type: Date,
        required: true
    },
    labour_id: {
        type: String,
        required: Schema.Types.ObjectId, ref: 'Labour'
    },
});

const Harvest = mongoose.model('Harvest', harvestSchema)

export { Harvest }