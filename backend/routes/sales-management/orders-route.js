import { Router } from "express";
import * as orderController from "../../controllers/sales-management/order-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all orders defined in orderController
router.get("/", orderController.index);

// show for getting a single orders defined in orderController
router.get("/:id", orderController.show);

// create for creating a new order defined in orderController
router.post("/", checkAuth, orderController.create);

// update for updating a order defined in orderController
router.put("/:id", checkAuth, orderController.update);

// destroy for deleting a order defined in orderController
router.delete("/:id", checkAuth, orderController.destroy);


export { router };

