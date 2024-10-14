import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const utilitiesSchema = new Schema(
    {
        utilityId: { type: String, required: true, unique: true },
        utilityName: { type: String, required: true },
        utilityType: { type: String, required: true },
        quantityInStock: { type: Number, required: true },
        dailyDistributionAmount: { type: Number, required: true },
        minimumLevel: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

utilitiesSchema.index({ utilityName: 1, utilityType: 1 }, { unique: true });

const Utilities = mongoose.model('Utilities', utilitiesSchema);

export { Utilities };
