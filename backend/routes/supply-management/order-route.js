import { Router } from "express";
import * as orderController from "../../controllers/supply-management/order-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// Get all orders
router.get("/", checkAuth, orderController.index);

// Get a single order
router.get("/:id", checkAuth, orderController.show);

// Create a new order
router.post("/", checkAuth, orderController.create);

// Update an order
router.put("/:id", checkAuth, orderController.update);

// Delete an order
router.delete("/:id", checkAuth, orderController.destroy);

export { router };
