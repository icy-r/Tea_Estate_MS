import { Router } from "express";
import * as RoleController  from "../../controllers/employee-management/roles-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";



const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// index for getting all machines defined in RoleController
router.get("/", RoleController.index);

// show for getting a single machine defined in RoleController
router.get("/:id", RoleController.show);

// create for creating a new machine defined in RoleController
router.post("/", checkAuth, RoleController.create);

// update for updating a machine defined in RoleController
router.put("/:id", checkAuth, RoleController.update);

// destroy for deleting a machine defined in RoleController
router.delete("/:id", checkAuth, RoleController.destroy);


export { router };