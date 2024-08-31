import { Router } from "express";
import * as RecruitmentController  from "../../controllers/employee-management/applicant-controller.js";
import {checkAuth, decodeUserFromToken} from "../../middleware/auth-mid.js";



const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// index for getting all machines defined in RecruitmentController
router.get("/", RecruitmentController.index);

// show for getting a single machine defined in RecruitmentController
router.get("/:id", RecruitmentController.show);

// create for creating a new machine defined in RecruitmentController
router.post("/", checkAuth, RecruitmentController.create);

// update for updating a machine defined in RecruitmentController
router.put("/:id", checkAuth, RecruitmentController.update);

// destroy for deleting a machine defined in RecruitmentController
router.delete("/:id", checkAuth, RecruitmentController.destroy);


export { router };