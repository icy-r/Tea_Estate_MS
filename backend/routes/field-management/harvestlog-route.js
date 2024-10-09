import { Router } from "express";
import * as harvestLogController from "../../controllers/field-management/harvestlog-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all harvest logs defined in harvestLogController
router.get("/", harvestLogController.index);

// show for getting a single harvest log defined in harvestLogController
router.get("/:id", harvestLogController.show);

// create for creating a new harvest log defined in harvestLogController
router.post("/", checkAuth, harvestLogController.create);

export { router };
