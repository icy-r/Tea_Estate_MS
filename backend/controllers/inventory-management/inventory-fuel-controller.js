import { Fuel } from '../../models/inventory-management/inventory-fuel-model.js';
import { validationResult } from 'express-validator';

// Helper function to generate the next teaId
async function generateNextFuelId() {
  const lastFuel = await Fuel.findOne().sort({ createdAt: -1 }).select('fuelId');
  
  if (!lastFuel) {
      return 'FUEL001'; // Start with FUEL001 if no records exist
  }

  const lastId = lastFuel.fuelId;
  const numberPart = parseInt(lastId.replace('FUEL', ''), 10);
  const nextNumber = numberPart + 1;

  return `FUEL${String(nextNumber).padStart(3, '0')}`; // Ensure it's padded with zeros
}

// Get all fuel items
async function indexFuel(req, res) {
    try {
      const fuel = await Fuel.find({});
      res.json(fuel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
 // Get a single fuel item by fuelId
async function showFuel(req, res) {
  try {
      const fuel = await Fuel.findOne({ fuelId: req.params.id }); // Change here
      if (!fuel) throw new Error('Fuel item not found');
      res.json(fuel);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}
  
  // Create a new fuel item
  async function createFuel(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { fuelType, quantityInStock, dailyDistributionAmount, minimumLevel } = req.body;

        // Check for existing fuel entry based on both teaName and teaGrade
        const existingFuel = await Fuel.findOne({ fuelType });
        if (existingFuel) {
            return res.status(400).json({ error: 'Item exists: Fuel Type already exists.' });
        }
        const fuelId = await generateNextFuelId(); // Generate the next teaId

        const fuel = new Fuel({
            fuelId,
            fuelType,
            quantityInStock,
            dailyDistributionAmount,
            minimumLevel,
        });

        await fuel.save();
        res.status(201).json(fuel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
// Update an existing fuel item by fuelId
async function updateFuel(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const updatedFuel = await Fuel.findOneAndUpdate(
          { fuelId: req.params.id }, 
          req.body,
          { new: true }
      );

      if (!updatedFuel) {
          return res.status(404).json({ error: 'Fuel item not found' });
      }

      res.json(updatedFuel);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

  
 // Delete a fuel item by fuelId
async function destroyFuel(req, res) {
  try {
      const fuel = await Fuel.findOneAndDelete({ fuelId: req.params.id }); 
      if (!fuel) throw new Error('Fuel item not found');
      res.json({ message: 'Fuel item deleted' });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

  export { indexFuel, showFuel, createFuel, updateFuel, destroyFuel, generateNextFuelId };