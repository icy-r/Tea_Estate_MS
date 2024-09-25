import { Router } from "express";
import * as TransportLog from "../../controllers/transport-management/transport-log-controller.js";
import * as transportModel from "../../models/transport-management/transport-model.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();
router.use(decodeUserFromToken)

router.get("/", checkAuth,TransportLog.index);
router.get("/:id",checkAuth, TransportLog.show);
router.post("/", checkAuth, TransportLog.create);
router.put("/:id", checkAuth, TransportLog.update);
router.delete("/:id", checkAuth, TransportLog.destroy);

export { router };
