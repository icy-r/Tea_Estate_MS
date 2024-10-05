import{Router} from "express";
import * as harvestController from "../../controllers/field-management/harvest-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all machines defined in machineController
router.get("/", harvestController.index);

// show for getting a single machine defined in machineController
router.get("/:id", harvestController.show);

// create for creating a new machine defined in machineController
router.post("/", checkAuth, harvestController.create);

// update for updating a machine defined in machineController
router.put("/:id", checkAuth, harvestController.update);

// destroy for deleting a machine defined in machineController
router.delete("/:id", checkAuth, harvestController.destroy);

export { router };
