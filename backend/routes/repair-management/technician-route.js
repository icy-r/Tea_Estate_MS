import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
import { Router } from "express";
import {
  getTasksReq,
  getTasksSch,
} from "../../controllers/repair-management/technician-controller.js";

const router = Router();

/*---------- Public Routes ----------*/
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all tasks defined in technician-controller
router.get("/requests", checkAuth, getTasksReq);
router.get("/schedules", checkAuth, getTasksSch);

export default router;
