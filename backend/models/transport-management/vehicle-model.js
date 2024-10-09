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

vehicleSchema.post("save", async function (doc) {
  //add to asset model as well
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
});

vehicleSchema.post("findOneAndDelete", async function (doc) {
  //delete from asset model as well
  const Asset = mongoose.model("Asset");
  await Asset.findOne({
    assetNumber: doc.chassisNo,
  }).deleteOne();
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export { Vehicle };


