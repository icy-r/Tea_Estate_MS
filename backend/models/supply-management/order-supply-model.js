import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for order supplies
const orderSupplySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true, // Auto-generate the ID
    },
    supplierId: {
      type: String,
      required: true, // Assuming supplierId is required for an order supply
    },

    supplyType: {
      type: String,
      required: true, // Assuming supplyType is also required
    },

    quantity: {
      type: Number,
      required: true, // Assuming quantity is required
      min: 1, // Ensure quantity is a positive number
    },

    price: {
      type: Number,
      required: false,
      min: 0, // Ensure price is non-negative
    },

    additionalConditions: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "Pending", // Default status is Pending
    },

    qualityRating: {
      type: Number,
      min: 1,
      max: 5, // Restrict rating between 1 to 5
      required: function() {
        return this.status === 'Completed'; // Only required if status is 'Completed'
      },
      default: null
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const OrderSupply = mongoose.model("OrderSupply", orderSupplySchema);

export { OrderSupply };
