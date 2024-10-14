import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    owner_name: {
      type: String,
      required: false,
    },
    chassisNo: {
      type: String,
      required: false,
    },
    manufactureYear: {
      type: Date,
      required: false,
    },
    assignedDept: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    driver_id: {
      type: String,
      required: false,
    },
    owner_address: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "img",
    },
    status: {
      type: String,
      required: false,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.post("save", async function (doc) {
  try {
    // Only create an asset on initial save
    const Asset = mongoose.model("Asset");
    const asset = new Asset({
      assetNumber: doc.chassisNo,
      assetType: "vehicle",
      name: doc.owner_name,
      model: doc.type,
      manufacturer: "N/A",
      purchaseDate: doc.manufactureYear,
      lastMaintenanceDate: null,
      nextScheduledMaintenance: null,
      status: doc.status,
      location: doc.owner_address,
      maintenanceHistory: [],
    });
    await asset.save();
  } catch (error) {
    console.error("Error saving asset:", error);
  }
});

vehicleSchema.post("findOneAndDelete", async function (doc) {
  if (doc && doc.chassisNo) {
    try {
      const Asset = mongoose.model("Asset");
      await Asset.deleteOne({
        assetNumber: doc.chassisNo,
      });
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export { Vehicle };
