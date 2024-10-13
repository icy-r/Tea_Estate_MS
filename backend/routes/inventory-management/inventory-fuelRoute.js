import { Router } from 'express';
import * as fuelController from '../../controllers/inventory-management/inventory-fuel-controller.js';
import { checkAuth, decodeUserFromToken } from '../../middleware/auth-mid.js';
import { body } from 'express-validator';

// Create a new router instance
const router = Router();

const validateFuel = [
    body('fuelId').isString().notEmpty().withMessage('Fuel ID is required'),
    body('fuelType').notEmpty().withMessage('Fuel Type is required'),
    body('quantityInStock').isNumeric().withMessage('Quantity must be a number'),
    body('dailyDistributionAmount').isNumeric().withMessage('Daily Distribution Amount must be a number'),
    body('minimumLevel').isNumeric().withMessage('Minimum Level must be a number'),
];

// Route to check if a fuel entry already exists
router.get('/check-existence', async (req, res) => {
    const { fuelType } = req.query;
    try {
        const existingFuel = await Fuel.findOne({ fuelType });
        res.json({ exists: !!existingFuel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Optional: Route to get the next fuelId
router.get('/latest-id', async (req, res) => {
    try {
        const fuelId = await fuelController.generateNextFuelId();
        res.json({ fuelId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fuel routes
router.get('/', fuelController.indexFuel);
router.get('/:id', fuelController.showFuel);
router.post('/', validateFuel, fuelController.createFuel);
router.put('/:id',  validateFuel, fuelController.updateFuel);
router.delete('/:id',  fuelController.destroyFuel);

export { router };