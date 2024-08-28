import mongoose from 'mongoose'

const transportSchema = new mongoose.Schema({
    // id string pk
    // type string
    // dailyOccurrence int
    // vehicle_id string fk

    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    dailyOccurrence: {
        type: Number,
        required: true,
    },


},
{
    timestamps: true,
  
});

const Transport = mongoose.model('Transport', transportSchema);

export { Transport };

