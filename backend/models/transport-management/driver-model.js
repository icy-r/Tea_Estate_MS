import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema({
    driver_id: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness
    },
    vehicle_id: {
        type: String,
        required: true,
       
    },
   
    
});

const Driver = mongoose.model('Driver', driverSchema);

export { Driver };