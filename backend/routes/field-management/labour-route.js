import { Router } from "express";
import * as labourController from "../../controllers/field-management/labour-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all machines defined in machineController
router.get("/", labourController.index);

// show for getting a single machine defined in machineController
router.get("/:id", labourController.show);

// create for creating a new machine defined in machineController
router.post("/", checkAuth, labourController.create);

export { router };