import { Router } from "express";
import * as repairReqController from "../../controllers/repair-management/repair-req-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all repair requests defined in repairReqController
router.get("/", repairReqController.index);

// show for getting a single repair request defined in repairReqController
router.get("/:id", repairReqController.show);

// create for creating a new repair request defined in repairReqController
router.post("/", checkAuth, repairReqController.create);

// update for updating a repair request defined in repairReqController
router.put("/:id", checkAuth, repairReqController.update);

// destroy for deleting a repair request defined in repairReqController
router.delete("/:id", checkAuth, repairReqController.destroy);

export { router };