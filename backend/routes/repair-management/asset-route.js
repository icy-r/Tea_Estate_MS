import {
  create,
  destroy,
  index,
  search,
  show,
  update,
  performance,
} from "../../controllers/repair-management/asset-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
import { Router } from "express";

const router = Router();

/*---------- Public Routes ----------*/
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all assets defined in asset-controller
router.get("/", checkAuth, index);

// show for getting a single asset defined in asset-controller
router.get("/:id", checkAuth, show);

router.get("/:id/performance", checkAuth, performance);

// create for creating a new asset defined in asset-controller
router.post("/", checkAuth, create);

// update for updating a asset defined in asset-controller
router.put("/:id", checkAuth, update);

// destroy for deleting a asset defined in asset-controller
router.delete("/:id", checkAuth, destroy);

// searchField for searching a asset defined in asset-controller
router.get("/search/:id", checkAuth, search);

export { router };
