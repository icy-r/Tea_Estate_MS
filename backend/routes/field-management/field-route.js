import { Router } from "express";
import * as fieldController from "../../controllers/field-management/field-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all machines defined in machineController
router.get("/", fieldController.index);

// show for getting a single machine defined in machineController
router.get("/:id", fieldController.show);

// create for creating a new machine defined in machineController
router.post("/",checkAuth, fieldController.create);

// update for updating a machine defined in machineController
router.put("/:id",checkAuth, fieldController.update);

// destroy for deleting a machine defined in machineController
router.delete("/:id",checkAuth, fieldController.destroy);

export { router };

