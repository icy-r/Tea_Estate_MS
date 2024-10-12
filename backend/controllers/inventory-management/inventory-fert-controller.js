import { Fert } from '../../models/inventory-management/inventory-fert-model.js';
import { validationResult } from 'express-validator';

// Helper function to generate the next fertilizerId
async function generateNextFertId() {
  const lastFert = await Fert.findOne().sort({ createdAt: -1 }).select('fertilizerId');
  
  if (!lastFert) {
      return 'FERT001'; // Start with FERT001 if no records exist
  }

  const lastId = lastFert.fertilizerId;
  const numberPart = parseInt(lastId.replace('FERT', ''), 10);
  const nextNumber = numberPart + 1;

  return `FERT${String(nextNumber).padStart(3, '0')}`; // Ensure it's padded with zeros
}

// Get all fertilizer items
async function indexFert(req, res) {
    try {
        const fertilizer = await Fert.find({});
        res.json(fertilizer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single tea item by ID
async function showFert(req, res) {
  try {
      const fertilizer = await Fert.findById(req.params.id);
      if (!fertilizer) throw new Error('Fertilizer item not found');
      res.json(fertilizer);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

// Create a new fertilizer item
async function createFert(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const { fertilizerName, fertilizerType, quantityInStock, dailyDistributionAmount, minimumLevel } = req.body;

      // Check for existing fertilizer entry based on both fertilizerName and fertilizerType
      const existingFert = await Fert.findOne({ fertilizerName, fertilizerType });
      if (existingFert) {
          return res.status(400).json({ error: 'This fertilizer name and type combination already exists.' });
      }

      const fertilizerId = await generateNextFertId(); // Generate the next fertilizerId

      const fertilizer = new Fert({
          fertilizerId,
          fertilizerName,
          fertilizerType,
          quantityInStock,
          dailyDistributionAmount,
          minimumLevel,
      });

      await fertilizer.save();
      res.status(201).json(fertilizer);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}


// Update an existing fertilizer item
async function updateFert(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedFert = await Fert.findByIdAndUpdate(req.params.id,req.body, { new: true });
        if (!updatedFert) {
            return res.status(404).json({ error: 'Fertilizer item not found' });
        }

        res.json(updatedFert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a fertilizer item
async function destroyFert(req, res) {
    try {
        const fertilizer = await Fert.findByIdAndDelete(req.params.id);
        if (!fertilizer) throw new Error('Fertilizer item not found');
        res.json({ message: 'Fertilizer item deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Export all functions including generateNextFertId
export { indexFert, showFert, createFert, updateFert, destroyFert, generateNextFertId };
