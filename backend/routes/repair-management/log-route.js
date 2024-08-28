import { Router } from "express";
import * as logController from "../../controllers/repair-management/log-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all logs defined in logController
router.get("/", logController.index);

// show for getting a single log defined in logController
router.get("/:id", logController.show);

// create for creating a new log defined in logController
router.post("/", checkAuth, logController.create);

// update for updating a log defined in logController
router.put("/:id", checkAuth, logController.update);

// destroy for deleting a log defined in logController
router.delete("/:id", checkAuth, logController.destroy);

export { router };