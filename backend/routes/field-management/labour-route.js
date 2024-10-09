import { Router } from "express";
import * as labourController from "../../controllers/field-management/labour-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
//router.use(decodeUserFromToken);
// index for getting all labour defined in labourController
router.get("/", labourController.index);

// show for getting a single labour defined in labourController
router.get("/:id", labourController.show);

// create for creating a new labour defined in labourController
router.post("/", labourController.create);

// update for updating a labour defined in labourController
router.put("/:id", labourController.update);

export { router };