import mongoose from 'mongoose'

const transportSchema = new mongoose.Schema({
    // id string pk
    // type string
    // dailyOccurrence int
    // vehicle_id string fk

    id: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    dailyOccurrence: {
        type: Number,
        required: true,
    },

    vehicle_id: {
        type: String,
        required: true,
    },
    route_id: {
        type: String,
        required: true,
    },


},
{
    timestamps: true,
  
});

const Transport = mongoose.model('Transport', transportSchema);

export { Transport };

