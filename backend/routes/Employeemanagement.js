import { Router } from "express";
import * as EmployeeController  from "../controllers/EmoloyeeManagement.js";
import {checkAuth, decodeUserFromToken} from "../middleware/auth.js";

const router = Router();

router.get("/",EmployeeController.getAllEmployees);
router.post("/",checkAuth,EmployeeController.addEmployees);
router.get("/:id",EmployeeController.getById);
router.get("/:id",EmployeeController.updateEmployee);
router.delete("/:id",checkAuth,EmployeeController.deleteEmployee);

export { router };



