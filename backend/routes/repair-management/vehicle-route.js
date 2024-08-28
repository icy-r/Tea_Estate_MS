import { Router } from "express";
import * as vehicleController from "../../controllers/repair-management/vehicle-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all vehicles defined in vehicleController
router.get("/", vehicleController.index);

// show for getting a single vehicle defined in vehicleController
router.get("/:id", vehicleController.show);

// create for creating a new vehicle defined in vehicleController
router.post("/", checkAuth, vehicleController.create);

// update for updating a vehicle defined in vehicleController
router.put("/:id", checkAuth, vehicleController.update);

// destroy for deleting a vehicle defined in vehicleController
router.delete("/:id", checkAuth, vehicleController.destroy);

export { router };