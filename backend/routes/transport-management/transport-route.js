import { Router } from "express";
import * as transportController from "../../controllers/transport-management/transport-controller.js";
import * as transportModel from "../../models/transport-management/transport-model.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

router.get("/", transportController.index);
router.get("/:id", transportController.show);
router.post("/", checkAuth, transportController.create);
router.put("/:id", checkAuth, transportController.update);
router.delete("/:id", checkAuth, transportController.destroy);

export { router };
