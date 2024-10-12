import { Utilities } from '../../models/inventory-management/inventory-utilities-model.js';
import { validationResult } from 'express-validator';

// Helper function to generate the next teaId
async function generateNextUtilityId() {
  const lastUtility = await Utilities.findOne().sort({ createdAt: -1 }).select('utilityId');
  
  if (!lastUtility) {
      return 'UTY001'; // Start with UTY001 if no records exist
  }

  const lastId = lastUtility.utilityId;
  const numberPart = parseInt(lastId.replace('UTY', ''), 10);
  const nextNumber = numberPart + 1;

  return `UTY${String(nextNumber).padStart(3, '0')}`; // Ensure it's padded with zeros
}

// Get all utility items
async function indexUtilities(req, res) {
    try {
      const utilities = await Utilities.find({});
      res.json(utilities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Get a single utility item by ID
  async function showUtilities(req, res) {
    try {
      const utilities = await Utilities.findById(req.params.id);
      if (!utilities) throw new Error('Utility item not found');
      res.json(utilities);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  // Create a new utility item
  async function createUtilities(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { utilityName, utilityType, quantityInStock, dailyDistributionAmount, minimumLevel } = req.body;

      // Check for existing tea entry based on both teaName and teaGrade
      const existingUtility = await Utilities.findOne({ utilityName, utilityType });
      if (existingUtility) {
          return res.status(400).json({ error: 'Item exists: This utility name and type combination already exists.' });
      }

      const utilityId = await generateNextUtilityId(); // Generate the next teaId

      const utility = new Utilities({
          utilityId,
          utilityName,
          utilityType,
          quantityInStock,
          dailyDistributionAmount,
          minimumLevel,
      });

      await utility.save();
      res.status(201).json(utility);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
  }
  
  // Update an existing utility item
  async function updateUtilities(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const updatedUtility = await Utilities.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUtility) {
          return res.status(404).json({ error: 'Utility item not found' });
      }

      res.json(updatedUtility);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  }
  
  // Delete a utility item
  async function destroyUtilities(req, res) {
    try {
      const utilities = await Utilities.findByIdAndDelete(req.params.id);
      if (!utilities) throw new Error('Utility item not found');
      res.json({ message: 'Utility item deleted' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  export { indexUtilities, showUtilities, createUtilities, updateUtilities, destroyUtilities, generateNextUtilityId };