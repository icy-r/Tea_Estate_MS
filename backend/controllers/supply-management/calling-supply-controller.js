import { CallingSupply } from '../../models/supply-management/calling-supply-model.js';

// Get all calling supplies
async function index(req, res) {
  try {
    const callingSupplies = await CallingSupply.find({});
    res.json(callingSupplies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single calling supply
async function show(req, res) {
  try {
    const callingSupply = await CallingSupply.findOne({ callingSupplyId: req.params.id });
    if (!callingSupply) {
      return res.status(404).json({ error: 'Calling supply not found' });
    }
    res.json(callingSupply);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Create a calling supply
async function create(req, res) {
  try {
    const callingSupply = new CallingSupply(req.body);
    await callingSupply.save();
    res.json(callingSupply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update a calling supply
async function update(req, res) {
  try {
    const callingSupply = await CallingSupply.findOneAndUpdate({ callingSupplyId: req.params.id }, req.body, { new: true });
    if (!callingSupply) {
      return res.status(404).json({ error: 'Calling supply not found' });
    }
    res.json(callingSupply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a calling supply
async function destroy(req, res) {
  try {
    const callingSupply = await CallingSupply.findOneAndDelete({ callingSupplyId: req.params.id });
    if (!callingSupply) {
      return res.status(404).json({ error: 'Calling supply not found' });
    }
    res.json({ message: 'Calling supply deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };
