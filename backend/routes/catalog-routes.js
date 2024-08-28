import { Router } from "express";
import * as catalogCtrl from "../controllers/catalog-controller.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

//router.use(decodeUserFromToken);
router.get("/", catalogCtrl.index);
router.post("/", checkAuth, catalogCtrl.create);
router.get("/:id", catalogCtrl.show);
router.put("/:id", checkAuth, catalogCtrl.update);
router.delete("/:id", checkAuth, catalogCtrl.destroy);

export { router };