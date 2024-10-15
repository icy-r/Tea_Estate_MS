import { Router } from "express";
import * as supplyController from "../../controllers/supply-management/supply-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// router.use(decodeUserFromToken)
// index for getting all supplies defined in supplyController
router.get("/",checkAuth, supplyController.index);

// show for getting a single supplies defined in supplyController
router.get("/:id", checkAuth,supplyController.show);

// create for creating a new supplies defined in supplyController
router.post("/", checkAuth, supplyController.create);

// update for updating a supplies defined in supplyController
router.put("/:id", checkAuth, supplyController.update);

// destroy for deleting a supplies defined in supplyController
router.delete("/:id", checkAuth, supplyController.destroy);


export { router };