import { Router } from "express";
import * as supplierManagerController from "../../controllers/supply-management/supplierManager-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all supplier manager defined in supplierManagerController
router.get("/", supplierManagerController.index);

// show for getting a single supplier managers defined in supplierManagerController
router.get("/:id", supplierManagerController.show);

// create for creating a new supplier managers defined in supplierManagerController
router.post("/", checkAuth, supplierManagerController.create);

// update for updating a supplier managers defined in supplierManagerController
router.put("/:id", checkAuth, supplierManagerController.update);

// destroy for deleting a supplier managers defined in supplierManagerController
router.delete("/:id", checkAuth, supplierManagerController.destroy);


export { router };