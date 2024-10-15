import { Router } from "express";
import * as invoiceController from "../../controllers/sales-management/invoice-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// index for getting all invoices defined in invoiceController
router.get("/", invoiceController.index);

// show for getting a single invoice defined in invoiceController
router.get("/:id", invoiceController.show);

// create for creating a new invoice defined in invoiceController
router.post("/", checkAuth, invoiceController.create);

// update for updating a invoice defined in invoiceController
router.put("/:id", checkAuth, invoiceController.update);

// destroy for deleting a invoice defined in invoiceController
router.delete("/:id", checkAuth, invoiceController.destroy);


export { router };

