import { Router } from 'express';
import * as fertController from '../../controllers/inventory-management/inventory-fert-controller.js';
import { checkAuth } from '../../middleware/auth-mid.js';
import { body } from 'express-validator';

// Create a new router instance
const router = Router();

const validateFert = [
    body('fertilizerName').notEmpty().withMessage('Fertilizer Name is required'),
    body('fertilizerType').notEmpty().withMessage('Fertilizer Type is required'),
    body('quantityInStock').isNumeric().withMessage('Quantity must be a number'),
    body('dailyDistributionAmount').isNumeric().withMessage('Daily Distribution Amount must be a number'),
    body('minimumLevel').isNumeric().withMessage('Minimum Level must be a number'),
];

// Optional: Route to get the next fertilizerId
router.get('/latest-id', async (req, res) => {
    try {
        const latestFertId = await fertController.generateNextFertId(); // This function should return the next ID
        res.json({ fertilizerId: latestFertId }); // Use latestFertId here
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fertilizer routes
router.get('/', fertController.indexFert);
router.get('/:id', fertController.showFert);
router.post('/', validateFert, fertController.createFert);
router.put('/:id', checkAuth, validateFert, fertController.updateFert);
router.delete('/:id', checkAuth, fertController.destroyFert);

export { router };
