import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
  quality: String,
  quantity: String,
  unitPrice: String,
  description: String,
  aucDate: Date,
  aucTime: String,
  image: String,
}, {
  timestamps: true,
});

const Catalog = mongoose.model("Catalog", CatalogSchema);

export { Catalog };
