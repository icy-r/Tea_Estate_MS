import { Router } from 'express';
import * as utilitiesController from '../../controllers/inventory-management/inventory-utilities-controller.js';
import { checkAuth, decodeUserFromToken } from '../../middleware/auth-mid.js';
import { body } from 'express-validator';
import { Utilities } from '../../models/inventory-management/inventory-utilities-model.js';

// Create a new router instance
const router = Router();

const validateUtilities = [
    body('utilityId').isString().notEmpty().withMessage('Utility ID is required'),
    body('utilityName').notEmpty().withMessage('Utility Name is required'),
    body('utilityType').notEmpty().withMessage('Utility Type is required'),
    body('quantityInStock').isNumeric().withMessage('Quantity must be a number'),
    body('dailyDistributionAmount').isNumeric().withMessage('Daily Distribution Amount must be a number'),
    body('minimumLevel').isNumeric().withMessage('Minimum Level must be a number'),
];

// Route to check if a utility entry already exists
router.get('/check-existence', async (req, res) => {
    const { utilityName, utilityType } = req.query;
    const existingUtility = await Utilities.findOne({ utilityName, utilityType });
    res.json({ exists: !!existingUtility });
});

// Optional: Route to get the next utilityId
router.get('/latest-id', async (req, res) => {
    try {
        const utilityId = await utilitiesController.generateNextUtilityId();
        res.json({ utilityId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Utilities routes
router.get('/', utilitiesController.indexUtilities);
router.get('/:id', utilitiesController.showUtilities);
router.post('/', validateUtilities, utilitiesController.createUtilities);
router.put('/:id', checkAuth, validateUtilities, utilitiesController.updateUtilities);
router.delete('/:id', checkAuth, utilitiesController.destroyUtilities);

export { router };