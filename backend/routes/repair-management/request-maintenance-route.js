import {
  index,
  show,
  create,
  update,
  destroy,
  search,
} from "../../controllers/repair-management/request-maintenance-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
import { Router } from "express";

const router = Router();

/*---------- Public Routes ----------*/
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all maintenance requests defined in request-maintenance-controller
router.get("/", checkAuth, index);

// show for getting a single maintenance request defined in request-maintenance-controller
router.get("/:id", checkAuth, show);

// create for creating a new maintenance request defined in request-maintenance-controller
router.post("/", checkAuth, create);

// update for updating a maintenance request defined in request-maintenance-controller
router.put("/:id", checkAuth, update);

// destroy for deleting a maintenance request defined in request-maintenance-controller
router.delete("/:id", checkAuth, destroy);

// searchField for searching a maintenance request defined in request-maintenance-controller
router.get("/search/:id", checkAuth, search);

export default router;
