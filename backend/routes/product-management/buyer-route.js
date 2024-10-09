import { Router } from "express";   
import * as buyerController from "../../controllers/product-management/buyer-controller.js";   
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// index for getting all machines defined in machineController
router.get("/", buyerController.index);

// show for getting a single machine defined in machineController
router.get("/:id", buyerController.show);

// // create for creating a new machine defined in machineController
router.post("/", checkAuth, buyerController.create);

// // update for updating a machine defined in machineController
router.put("/:id", checkAuth, buyerController.update);

// // destroy for deleting a machine defined in machineController
router.delete("/:id", checkAuth, buyerController.destroy);


export { router };