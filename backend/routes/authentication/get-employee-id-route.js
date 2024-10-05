import { Router } from "express";
import jwt from "jsonwebtoken";
//employee model
import { Employee } from "../../models/employee-management/employee-model.js";

const SECRET = process.env.SECRET;

const router = Router();

router.get("/", async (req, res) => {
  //get token from headers
  let token = req.get("Authorization");
  if (!token) return res.status(401).json({ err: "Not Authorized" });

  token = token.replace("Bearer ", "");
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ err: "Not Authorized" });
    req.user = decoded.user;
    console.log(req.user);
    Employee.findById(req.user.employeeId)
      .then((employee) => {
        console.log(employee);
        res.status(200).json({ employeeId: employee._id });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ err: "Internal Server Error" });
      });
  });
});

export { router };
