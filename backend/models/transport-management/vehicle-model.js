import mongoose from 'mongoose'


const vehicleSchema = new mongoose.Schema({
    // id string pk
    // name string 
    // chassisNo string
    // manufactureYear date
    // assignedDept string
    // type string
    // owner_name string
    // driver_id string fk 
    
    id: {
        type: String,
        required: true,
    },


    name: {
        type: String,
        required: true,
    },
    chassisNo: {
        type: String,
        required: true,
    },

    manufactureYear: {
        type: Date,
        required: true,
    },
    assignedDept: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    owner_name: {
        type: String,
        required: true,
    },
    // driver_id is a foreign key comes from driver model
    driver_id: {
        type: String,
        required: true,
    },
}, 

{
    timestamps: true,
  
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export { Vehicle };