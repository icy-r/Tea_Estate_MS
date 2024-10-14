import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
import { Router } from "express";
import {
  getTasksReq,
  getTasksSch,
  updateMaintenanceSchedule,
  getTechnicians,
} from "../../controllers/repair-management/technician-controller.js";

const router = Router();

/*---------- Public Routes ----------*/
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all tasks defined in technician-controller
router.get("/", checkAuth, getTechnicians);
router.get("/requests", checkAuth, getTasksReq);
router.get("/schedules", checkAuth, getTasksSch);
router.put("/schedules/:id", checkAuth, updateMaintenanceSchedule);

export default router;
