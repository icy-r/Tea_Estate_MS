import { Router } from 'express';
import * as teaController from '../../controllers/inventory-management/inventory-tea-controller.js';
import { checkAuth } from '../../middleware/auth-mid.js';
import { body } from 'express-validator';

const router = Router();

// Validation rules 
const validateTea = [
    body('teaName').notEmpty().withMessage('Tea Name is required'),
    body('teaGrade').notEmpty().withMessage('Tea Grade is required'),
    body('quantityInStock').isNumeric().withMessage('Quantity must be a number'),
    body('addedDate').isISO8601().withMessage('Added Date must be a valid ISO 8601 date'),
    body('minimumLevel').isNumeric().withMessage('Minimum Level must be a number'),
];

// Route to check if a tea entry already exists
router.get('/check-existence', async (req, res) => {
    const { teaName, teaGrade } = req.query;
    const existingTea = await Tea.findOne({ teaName, teaGrade });
    res.json({ exists: !!existingTea });
});

// Optional: Route to get the next teaId
router.get('/latest-id', async (req, res) => {
    try {
        const teaId = await teaController.generateNextTeaId();
        res.json({ teaId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tea routes
router.get('/', teaController.indexTea);
router.get('/:id', teaController.showTea);
router.post('/', validateTea, teaController.createTea);
router.put('/:id', checkAuth, validateTea, teaController.updateTea);
router.delete('/:id', checkAuth, teaController.destroyTea);

export { router };
