import { Router } from 'express';
import * as inventoryController from '../../controllers/inventory-management/inventory-controller.js';
import { checkAuth } from '../../middleware/auth-mid.js';
import { body } from 'express-validator'; // For validation

const router = Router();

// Define validation rules
const validateInventory = [
    body('inventoryId').isString().withMessage('Inventory ID must be a string').notEmpty().withMessage('Inventory ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('purchaseDate').isISO8601().withMessage('Purchase Date must be a valid ISO 8601 date'),
    body('minLevel').isNumeric().withMessage('Min Level must be a number'),
  ];

// Public routes

// Protected routes
router.use(checkAuth);

router.get('/', inventoryController.index);
router.get('/:id', inventoryController.show);
router.post('/', validateInventory, inventoryController.create);
router.put('/:id', validateInventory, inventoryController.update);
router.delete('/:id', inventoryController.destroy);

export { router };
