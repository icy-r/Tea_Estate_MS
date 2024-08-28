import Invoice  from '../../models/sales-management/invoice.js';

async function index(req, res) {
  try {
    //get all machines
    const inovice = await Invoice.find({});
    res.json(inovice);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_invoice = req.params.id
    const inovice = await Invoice.find({id: req.params.id});
    res.json(invoice);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const inovice = new Invoice(req.body);
    await inovice.save();
    res.json(inovice);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const inovice = await Invoice.findById(req.params.id);
    Object.assign(inovice, req.body);
    await inovice.save();
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const inovice = await Invoice.findById(req.params.id);
    await machine.remove();
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

export { index, show, create, update, destroy };