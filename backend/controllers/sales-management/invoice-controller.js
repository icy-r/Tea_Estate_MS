import { Invoice } from '../../models/sales-management/invoice-model.js';

const generateInvoiceNumber = async () => {
  // Find the latest invoice in the database (sorted by the creation date or invoice number)
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
  
  if (!lastInvoice || !lastInvoice.invoice_Number) {
    return 'INV0001'; // If no previous invoice exists, start with INV0001
  }

  // Extract the numeric part of the last invoice number
  const lastInvoiceNumber = lastInvoice.invoice_Number;
  const numericPart = parseInt(lastInvoiceNumber.replace('INV', '')) || 0;

  // Increment the number and format it as "INV000X"
  const nextInvoiceNumber = `INV${String(numericPart + 1).padStart(4, '0')}`;

  return nextInvoiceNumber;
};

async function index(req, res) {
  try {
    // Get all invoices and populate buyer and order details
    const invoices = await Invoice.find({})
      .populate('buyer_id')  // Populate buyer details
      .populate('order_id') // Populate order details
      .populate('product_id');  // Populate product details
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    // Get a single invoice and populate buyer and order details
    const invoice = await Invoice.findById(req.params.id)
      .populate('buyer_id')  // Populate buyer details
      .populate('order_id')  // Populate order details
      .populate('product_id');  // Populate product details
    res.json(invoice);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('buyer_id').populate('order_id').populate('product_id');  // Populate buyer, order and product details
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };