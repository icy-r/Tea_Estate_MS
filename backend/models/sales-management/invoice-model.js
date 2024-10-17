import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    invoice_Number: String,
    title: String,
    date: String,
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Buyer',  // Reference to Buyer model
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',  // Reference to Order model
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catalog',  // Reference to Product model
    },
   
    address: String,
    telephone: String,
    email: String,
    quantity: String,
    uni_price: String,
    subtotal: String,
    sales_tax: String,
    grand_total: String,
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

export { Invoice };