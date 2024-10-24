import { Router } from "express";
import * as EmployeeController  from "../../controllers/employee-management/employee-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";



const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// index for getting all machines defined in EmployeeController
router.get("/", EmployeeController.index);

// show for getting a single machine defined in EmployeeController
router.get("/:id", EmployeeController.show);

// create for creating a new machine defined in EmployeeController
router.post("/", EmployeeController.create);

// update for updating a machine defined in EmployeeController
router.put("/:id", EmployeeController.update);

// destroy for deleting a machine defined in EmployeeController
router.delete("/:id", EmployeeController.destroy);

// harvest
router.post("/update-ot", checkAuth, EmployeeController.updateOT);


export { router };

