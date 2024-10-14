import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teaSchema = new Schema(
    {
        teaId: { type: String, required: true, unique: true },
        teaName: { type: String, required: true },
        teaGrade: { type: String, required: true },
        quantityInStock: { type: Number, required: true },
        addedDate: { type: Date, required: true },
        minimumLevel: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

// Create a composite unique index for teaName and teaGrade
teaSchema.index({ teaName: 1, teaGrade: 1 }, { unique: true });

const Tea = mongoose.model('Tea', teaSchema);

export { Tea };
