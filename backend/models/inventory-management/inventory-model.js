import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        inventoryId: { type: String, required: true, unique: true},
        name: { type: String, required: true },
        type: { type: String, required: true }, 
        quantity: { type: Number, required: true },
        purchaseDate: { type: Date, required: true },
        minLevel: { type: Number, required: true }, // Reorder level
    }, 
    {
        timestamps: true,
    }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export { Inventory };



