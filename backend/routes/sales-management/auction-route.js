import { Router } from "express";
import * as auctionController from "../../controllers/sales-management/auction-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);  // Ensure the token is decoded for all protected routes

// Index for getting all auctions
router.get("/", auctionController.index);

// Show for getting a single auction by ID
router.get("/:id", auctionController.show);

// Create for creating a new auction
router.post("/", checkAuth, auctionController.create);

// Update for updating an auction
router.put("/:id", checkAuth, auctionController.update);

// Delete for deleting an auction
router.delete("/:id", checkAuth, auctionController.destroy);

export { router };
