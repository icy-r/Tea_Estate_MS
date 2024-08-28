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
        type: String,
        required: true
    },

    area: {
        type: Number,
        required: true
    },

    labour: {
        type: String,
        required: true
    },

    cropStage: {
        type: String,
        required: true
    }

});

const Field = mongoose.model('Field', fieldSchema)

export { Field }