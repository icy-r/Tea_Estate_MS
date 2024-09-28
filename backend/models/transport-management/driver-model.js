import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    assignedVehicle: {
        type: String,
        required: true
    },
});

const Driver = mongoose.model('Driver', driverSchema);

export { Driver };