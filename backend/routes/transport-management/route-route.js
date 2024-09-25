import { Router } from "express";
import * as routeController from "../../controllers/transport-management/route-controller.js";
import * as routeModel from "../../models/transport-management/route-model.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

router.use(decodeUserFromToken)

router.get("/", checkAuth,routeController.index);
router.get("/:id", checkAuth, routeController.show);
router.post("/", checkAuth, routeController.create);
router.put("/:id", checkAuth, routeController.update);
router.delete("/:id", checkAuth, routeController.destroy);

export { router };
