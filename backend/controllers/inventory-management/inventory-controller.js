import { Inventory } from '../../models/inventory-management/inventory-model.js';
import { validationResult } from 'express-validator'; // For validation

// Get all inventory items
async function index(req, res) {
  try {
    const inventory = await Inventory.find({});
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Get a single inventory item by ID
async function show(req, res) {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) throw new Error('Inventory item not found');
    res.json(inventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Create a new inventory item
async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update an existing inventory item
async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) throw new Error('Inventory item not found');
    Object.assign(inventory, req.body);
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an inventory item
async function destroy(req, res) {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) throw new Error('Inventory item not found');
    await inventory.remove();
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };
