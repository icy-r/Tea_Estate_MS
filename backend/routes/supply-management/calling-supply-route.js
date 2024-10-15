import { Router } from "express";
import * as callingSupplyController from "../../controllers/supply-management/calling-supply-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// Get all orders
router.get("/", checkAuth, callingSupplyController.index);

// Get a single order
router.get("/:id", checkAuth, callingSupplyController.show);

// Create a new order
router.post("/", checkAuth, callingSupplyController.create);

// Update an order
router.put("/:id", checkAuth, callingSupplyController.update);

// Delete an order
router.delete("/:id", checkAuth, callingSupplyController.destroy);

export { router };