import mongoose from "mongoose";

const Schema = mongoose.Schema;

const harvestSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    field_id: {
        type: Schema.Types.ObjectId, ref: 'Field',
        required: true
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
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    labour_id: {
        type: Schema.Types.ObjectId, ref: 'Labour',
        required: true
    },

    total:{
        type: Number,
        required: true,
        default: function() {
            return this.good_qnty + this.best_qnty + this.damaged_qnty;
        }
    },

});

const Harvest = mongoose.model('Harvest', harvestSchema)

export { Harvest }