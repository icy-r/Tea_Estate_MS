import { Tea } from '../../models/inventory-management/inventory-tea-model.js';
import { validationResult } from 'express-validator';

// Helper function to generate the next teaId
async function generateNextTeaId() {
    const lastTea = await Tea.findOne().sort({ createdAt: -1 }).select('teaId');
    
    if (!lastTea) {
        return 'TEA001'; // Start with TEA001 if no records exist
    }

    const lastId = lastTea.teaId;
    const numberPart = parseInt(lastId.replace('TEA', ''), 10);
    const nextNumber = numberPart + 1;

    return `TEA${String(nextNumber).padStart(3, '0')}`; // Ensure it's padded with zeros
}

// Get all tea items
async function indexTea(req, res) {
    try {
        const tea = await Tea.find({});
        res.json(tea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single tea item by ID
async function showTea(req, res) {
    try {
        const tea = await Tea.findById(req.params.id);
        if (!tea) throw new Error('Tea item not found');
        res.json(tea);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Create a new tea item
async function createTea(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { teaName, teaGrade, quantityInStock, addedDate, minimumLevel } = req.body;

        // Check for existing tea entry based on both teaName and teaGrade
        const existingTea = await Tea.findOne({ teaName, teaGrade });
        if (existingTea) {
            return res.status(400).json({ error: 'Item exists: This tea name and grade combination already exists.' });
        }

        const teaId = await generateNextTeaId(); // Generate the next teaId

        const tea = new Tea({
            teaId,
            teaName,
            teaGrade,
            quantityInStock,
            addedDate,
            minimumLevel,
        });

        await tea.save();
        res.status(201).json(tea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update an existing tea item
async function updateTea(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedTea = await Tea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTea) {
            return res.status(404).json({ error: 'Tea item not found' });
        }

        res.json(updatedTea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a tea item
async function destroyTea(req, res) {
    try {
        const tea = await Tea.findByIdAndDelete(req.params.id);
        if (!tea) throw new Error('Tea item not found');
        res.json({ message: 'Tea item deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Export all functions including generateNextTeaId
export { indexTea, showTea, createTea, updateTea, destroyTea, generateNextTeaId };
