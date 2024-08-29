import { Router } from "express";
import * as supplierController from "../../controllers/supply-management/supplier-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all suppliers defined in supplierController
router.get("/", supplierController.index);

// show for getting a single supplier defined in supplierController
router.get("/:id", supplierController.show);

// create for creating a new supplier defined in supplierController
router.post("/", checkAuth, supplierController.create);

// update for updating a supplier defined in supplierController
router.put("/:id", checkAuth, supplierController.update);

// destroy for deleting a supplier defined in supplierController
router.delete("/:id", checkAuth, supplierController.destroy);


export { router };