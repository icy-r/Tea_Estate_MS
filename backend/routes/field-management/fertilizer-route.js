import { Router } from "express";
import * as fertilizerController from "../../controllers/field-management/field-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all machines defined in machineController
router.get("/", fertilizerController.index);

// show for getting a single machine defined in machineController
router.get("/:id", fertilizerController.show);

// create for creating a new machine defined in machineController
router.post("/", checkAuth, fertilizerController.create);

// update for updating a machine defined in machineController
router.put("/:id", checkAuth, fertilizerController.update);

// destroy for deleting a machine defined in machineController
router.delete("/:id", checkAuth, fertilizerController.destroy);

export { router };

