import { Router } from "express";
import * as driverController from "../../controllers/transport-management/driver-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

router.use(decodeUserFromToken)

router.get("/", checkAuth,driverController.index);
router.get("/:id", checkAuth, driverController.show);
router.post("/", checkAuth, driverController.create);
router.put("/:id", checkAuth, driverController.update);
router.delete("/:id", checkAuth, driverController.destroy);

export { router };
