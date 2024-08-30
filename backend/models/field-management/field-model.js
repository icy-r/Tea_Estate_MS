import mongoose from 'mongoose'

const Schema = mongoose.Schema

const fieldSchema = new Schema({

    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    fertilizerSchedule: {
        type: Schema.Types.ObjectId, ref: 'Fertilizer',
        required: true
    },

    area: {
        type: Number,
        required: true
    },

    labour: {
        type: Schema.Types.ObjectId, ref: 'Labour',
        required: true
    },

    cropStage: {
        type: String,
        required: true
    },

    emp_required:{
        type: Number,
        required: true
    },

    emp_assigned:{
        type: String,
        required: true
    },

    no_emp_assigned:{
        type: Number,
        required: true
    }

});

const Field = mongoose.model('Field', fieldSchema)

export { Field }