import { Router } from "express";
import * as vehicleController from "../../controllers/transport-management/vehicle-controller.js";
import * as vehicleModel from "../../models/transport-management/vehicle-model.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";


const router = Router();

router.use(decodeUserFromToken)

router.get("/", checkAuth,vehicleController.index);
router.get("/:id",checkAuth, vehicleController.show);
router.post("/", checkAuth, vehicleController.create);
router.put("/:id", checkAuth, vehicleController.update);
router.delete("/:id", checkAuth, vehicleController.destroy);

export { router };
