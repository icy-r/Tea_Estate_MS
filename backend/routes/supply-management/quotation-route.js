import { Router } from "express";
import * as quotationController from "../../controllers/supply-management/quotation-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// Get all orders
router.get("/", checkAuth, quotationController.index);

// Get a single order
router.get("/:id", checkAuth, quotationController.show);

// Create a new order
router.post("/", checkAuth, quotationController.create);

// Update an order
router.put("/:id", checkAuth, quotationController.update);
router.put("/:id/status", checkAuth, quotationController.updateStatus);

// Delete an order
router.delete("/:id", checkAuth, quotationController.destroy);

export { router };