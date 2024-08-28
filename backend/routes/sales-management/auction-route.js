import { Router } from "express";
import * as auctionController from "../../controllers/sales-management/auction-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all auction defined in auctionController
router.get("/", auctionController.index);

// show for getting a single auction defined in auctionController
router.get("/:id", auctionController.show);

// create for creating a new auction defined in auctionController
router.post("/", checkAuth, auctionController.create);

// update for updating a auction defined in auctionController
router.put("/:id", checkAuth, auctionController.update);

// destroy for deleting a auction defined in auctionController
router.delete("/:id", checkAuth, auctionController.destroy);


export { router };

