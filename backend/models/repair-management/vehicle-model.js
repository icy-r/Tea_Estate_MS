import mongoose from 'mongoose'
const Schema = mongoose.Schema

const vehicleModelSchema = new Schema({
    item_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Machine', 'Vehicle'], required: true },
    assigned_driver_id: { type: Schema.Types.ObjectId, ref: 'User' },
    }, {
    timestamps: true,
})

const VehicleModel = mongoose.model('VehicleModel', vehicleModelSchema)

export { VehicleModel }