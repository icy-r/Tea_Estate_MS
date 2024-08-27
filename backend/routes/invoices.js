import { Router } from "express";
import * as invoiceController from "../controllers/invoiceController.js";
import {checkAuth, decodeUserFromToken} from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all machines defined in machineController
router.get("/", invoiceController.index);

// show for getting a single machine defined in machineController
router.get("/:id", invoiceController.show);

// create for creating a new machine defined in machineController
 router.post("/", checkAuth, invoiceController.create);

// // update for updating a machine defined in machineController
 router.put("/:id", checkAuth, invoiceController.update);

// // destroy for deleting a machine defined in machineController
 router.delete("/:id", checkAuth, invoiceController.destroy);


export { router };
 
