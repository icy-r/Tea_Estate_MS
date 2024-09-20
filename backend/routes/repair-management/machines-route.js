import { Router } from "express";
import * as machineController from "../../controllers/repair-management/machine-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// index for getting all machines defined in machineController
router.get("/", checkAuth, machineController.index);

// show for getting a single machine defined in machineController
router.get("/:id", checkAuth, machineController.show);

// create for creating a new machine defined in machineController
router.post("/", checkAuth, machineController.create);

// update for updating a machine defined in machineController
router.put("/:id", checkAuth, machineController.update);

// destroy for deleting a machine defined in machineController
router.delete("/:id", checkAuth, machineController.destroy);


export { router };