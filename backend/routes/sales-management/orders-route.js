import { Router } from 'express';
import * as orderController from '../../controllers/sales-management/order-controller.js';
import { checkAuth, decodeUserFromToken } from '../../middleware/auth-mid.js';

const router = Router();

/*---------- Public Routes ----------*/
// Get all orders
router.get('/', orderController.index);

// Get a single order by ID
router.get('/:id', orderController.show);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// Create a new order
router.post('/', orderController.create);

// Update an existing order
router.put('/:id', orderController.update);

// Delete an order
router.delete('/:id', orderController.destroy);

export { router };
