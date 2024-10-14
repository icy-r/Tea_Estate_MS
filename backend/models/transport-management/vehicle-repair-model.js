import mongoose from 'mongoose';

const vehicleRepairSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    vehicle_id: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
        default: "requesting",
    },
    repair_description: {
        type: String,
        required: false,
    },
    replaced_parts: {
        type: String,
        required: false,
    },
    request_description: {
        type: String,
        required: false,
        
    },
    damage_images: {
        type: String,
        required: false,
        default: "img",
    },
}, {
    timestamps: true,
});

const VehicleRepair = mongoose.model('VehicleRepair', vehicleRepairSchema);

export { VehicleRepair };
