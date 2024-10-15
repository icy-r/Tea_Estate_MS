import { Router } from "express";
import * as salesController from "../../controllers/sales-management/sales-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all sales defined in salesController
router.get("/", salesController.index);

// show for getting a single sales defined in salesController
router.get("/:id", salesController.show);

// create for creating a new sales defined in salesController
router.post("/", checkAuth, salesController.create);

// update for updating a sales defined in salesController
router.put("/:id", checkAuth, salesController.update);

// destroy for deleting a sales defined in salesController
router.delete("/:id", checkAuth, salesController.destroy);


export { router };

