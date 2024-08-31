import { Invoice } from '../../models/sales-management/invoice-model.js';

async function index(req, res) {
  try {
    //get all invoices
    const invoices = await Invoice.find({});
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_invoice = req.params.id
    const invoice = await Invoice.find({id: req.params.id});
    res.json(invoice);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const invoice = await Invoice.findByIdAndUpdate( req.params.id);

    Object.assign(invoice, req.body);
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const invoice = await Invoice.findByIdAndDelete( req.params.id );
    if (!invoice) {
      return res.status(404).json({ error: 'invoice not found' });
    }
    await invoice.deleteOne();
    res.json({ message: 'invoice deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };