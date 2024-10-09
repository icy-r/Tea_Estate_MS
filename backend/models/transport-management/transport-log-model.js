import mongoose from 'mongoose'

const transportLogSchema = new mongoose.Schema({


    // id: {
    //     type: String,
    //     required: false,
    // },
    type: {
        type: String,
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
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    startedTime: {
        type: Date,
        required: false,
    },
    completedTime: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    


},
{
    timestamps: true,
  
});

const TransportLog = mongoose.model('TransportLog', transportLogSchema);

export { TransportLog };

