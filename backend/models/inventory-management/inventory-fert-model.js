import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fertSchema = new Schema(
    {
        fertilizerId: { type: String, required: true, unique: true },
        fertilizerName: { type: String, required: true },
        fertilizerType: { type: String, required: true },
        quantityInStock: { type: Number, required: true },
        dailyDistributionAmount: { type: Number, required: true },
        minimumLevel: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

// Create a composite unique index for fertilizerName and fertilizerType
fertSchema.index({ fertilizerName: 1, fertilizerType: 1 }, { unique: true });

const Fert = mongoose.model('Fert', fertSchema);

export { Fert };
