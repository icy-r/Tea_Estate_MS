import { Router } from "express";
import * as EmployeeController  from "../controllers/EmoloyeeManagement.js";
import {checkAuth, decodeUserFromToken} from "../middleware/auth.js";

const Employee = require("../models/EmployeeModel");

const EmployeeController = require("../controllers/EmployeeControl");

router.get("/",EmployeeController.getAllEmployees);
router.post("/",EmployeeController.addEmployees);
router.get("/:id",EmployeeController.getById);
router.get("/:id",EmployeeController.updateEmployee);
router.delete("/:id",EmployeeController.deleteEmployee);

module.exports = router;
