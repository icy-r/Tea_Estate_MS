import mongoose from 'mongoose'


const vehicleSchema = new mongoose.Schema({

    
    id: {//have
        type: String,
        required: false,
    },


    owner_name: {//have
        type: String,
        required: false,
    },
    chassisNo: {//have
        type: String,
        required: false,
    },

    manufactureYear: {//have
        type: Date,
        required: false,
    },
    assignedDept: {//have
        type: String,
        required: false,
    },
    type: {//have
        type: String,
        required: false,
    },
    // driver_id is a foreign key comes from driver model
    driver_id: {
        type: String,
        required: false,
    },
    owner_address: {//have
        type: String,
        required: false,
    },
    status: {//have
        type: String,
        required: false,
         default: 'Active',
    },

}, 

{
    timestamps: true,
  
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export { Vehicle };