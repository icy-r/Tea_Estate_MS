import {
  create,
  destroy,
  index,
  searchField,
  show,
  update,
} from "../../controllers/repair-management/maintenance-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
import { Router } from "express";

const router = Router();

/*---------- Public Routes ----------*/
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
// index for getting all maintenances defined in maintenance-controller
router.get("/", checkAuth, index);

// show for getting a single maintenance defined in maintenance-controller
router.get("/:id", checkAuth, show);

// create for creating a new maintenance defined in maintenance-controller
router.post("/", checkAuth, create);

// update for updating a maintenance defined in maintenance-controller
router.put("/:id", checkAuth, update);

// destroy for deleting a maintenance defined in maintenance-controller
router.delete("/:id", checkAuth, destroy);

// searchField for searching a maintenance defined in maintenance-controller
router.get("/searchField", checkAuth, searchField);

export default router;
