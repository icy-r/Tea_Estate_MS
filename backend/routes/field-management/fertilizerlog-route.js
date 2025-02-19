import { Router } from "express";
import * as ferlizerLogController from "../../controllers/field-management/fertilizerlog-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// create for creating a new fertilizer log defined in ferlizerLogController
router.post("/", checkAuth, ferlizerLogController.createFertilizerLog);

// index for getting all machines defined in ferlizerLogController
router.get("/", ferlizerLogController.indexFertilizerLogs);

// show for getting a single machine defined in ferlizerLogController
router.get("/:id", ferlizerLogController.showFertilizerLogs);

export { router };
