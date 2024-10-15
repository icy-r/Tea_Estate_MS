import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fuelSchema = new Schema(
    {
        fuelId: { type: String, required: true, unique: true },
        fuelType: { type: String, required: true },
        quantityInStock: { type: Number, required: true },
        dailyDistributionAmount: { type: Number, required: true },
        minimumLevel: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Fuel = mongoose.model('Fuel', fuelSchema);

export { Fuel };