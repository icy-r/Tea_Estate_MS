import { Quotation } from '../../models/supply-management/quotation-model.js';

// Get all quotations
async function index(req, res) {
  try {
    const quotations = await Quotation.find({});
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single quotation
async function show(req, res) {
  try {
    const quotation = await Quotation.findOne({ quotationId: req.params.id });
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json(quotation);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Create a quotation
async function create(req, res) {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update a quotation
async function update(req, res) {
  try {
    const quotation = await Quotation.findOneAndUpdate({ quotationId: req.params.id }, req.body, { new: true });
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a quotation
async function destroy(req, res) {
  try {
    const quotation = await Quotation.findOneAndDelete({ quotationId: req.params.id });
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json({ message: 'Quotation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };
