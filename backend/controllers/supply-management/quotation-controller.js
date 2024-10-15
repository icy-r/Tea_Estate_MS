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
    const quotation = await Quotation.findOne({ callingSupplyId: req.params.id });
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
    console.log(req.body);
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params; // Get the quotation ID from request parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Update the quotation using its Mongoose ID
    const quotation = await Quotation.findByIdAndUpdate(id, updatedData, { new: true });
    console.log(quotation);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    res.json(quotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
//update the quotation
async function update(req, res) {
  try {
    const quotation = await Quotation.findOneAndUpdate({ callingSupplyId: req.params.id }, req.body, { new: true });
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

export { index, show, create, update, destroy, updateStatus };
