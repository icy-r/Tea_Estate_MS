import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
  pid: String,
  quality: String,
  quantity: String,
  unitPrice: String,
  description: String,
  aucDate: Date,
  aucTime: String,
}, {
  timestamps: true,
});

const Catalog = mongoose.model("Catalog", CatalogSchema);

export { Catalog };
