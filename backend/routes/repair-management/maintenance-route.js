import { Router } from "express";
import * as maintenanceController from "../../controllers/repair-management/maintenance-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all maintenances defined in maintenanceController
router.get("/", maintenanceController.index);

// show for getting a single maintenance defined in maintenanceController
router.get("/:id", maintenanceController.show);

// create for creating a new maintenance defined in maintenanceController
router.post("/", checkAuth, maintenanceController.create);

// update for updating a maintenance defined in maintenanceController
router.put("/:id", checkAuth, maintenanceController.update);

// destroy for deleting a maintenance defined in maintenanceController
router.delete("/:id", checkAuth, maintenanceController.destroy);

export { router };