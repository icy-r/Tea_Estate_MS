import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
    // id string pk
    // distance int
    // tripsPerDayNeeded int
    id: {
        type: String,
        required: true
    },

    distance: {
        type: Number,
        required: true
    },
    tripsPerDayNeeded: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
})

const Route = mongoose.model('Route', routeSchema)

export { Route };

