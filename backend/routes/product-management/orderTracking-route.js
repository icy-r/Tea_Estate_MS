import { Router } from "express";
import * as orderTrackingController from "../../controllers/product-management/orderTracking-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all orderTrackings defined in orderTrackingController
router.get("/", orderTrackingController.index);

// show for getting a single orderTracking defined in orderTrackingController
router.get("/:id", orderTrackingController.show);

// create for creating a new orderTracking defined in orderTrackingController
router.post("/", checkAuth, orderTrackingController.create);

// update for updating a orderTracking defined in orderTrackingController
router.put("/:id", checkAuth, orderTrackingController.update);

// destroy for deleting a orderTracking defined in orderTrackingController
router.delete("/:id", checkAuth, orderTrackingController.destroy);


export { router };