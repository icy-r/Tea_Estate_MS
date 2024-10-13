// npm packages
import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import cors from "cors";
import formData from "express-form-data";
import nodemailer from "nodemailer";

// connect to MongoDB with mongoose
import "./config/database.js";

// import routes
import { router as invoicesRouter } from "./routes/sales-management/invoices-route.js";
import { router as profilesRouter } from "./routes/user-management/profiles-route.js";
import { router as authRouter } from "./routes/authentication/auth-route.js";
import { router as getEmployeeIdRouter } from "./routes/authentication/get-employee-id-route.js";

// Transport Management Routes
import { router as vehiclesRouter } from './routes/transport-management/vehicle-route.js';
import { router as routeRouter } from './routes/transport-management/route-route.js';
import { router as transportLogRouter } from './routes/transport-management/transport-log-route.js';
import { router as transportRouter } from './routes/transport-management/transport-route.js';
import { router as driverRouter } from './routes/transport-management/driver-route.js';

// Repair Management Routes
import { router as assetsRouter } from "./routes/repair-management/asset-route.js";
import maintenancesRouter from "./routes/repair-management/maintenance-route.js";
import technicianRouter from "./routes/repair-management/technician-route.js";
import requestMaintenanceRouter from "./routes/repair-management/request-maintenance-route.js";

// Product Management Routes
import { router as catalogRouter } from "./routes/product-management/catalog-route.js";
import { router as buyersRouter } from "./routes/product-management/buyer-route.js";

// Field Management Routes
import { router as fieldRouter } from "./routes/field-management/field-route.js";
import { router as fertilizerRouter } from "./routes/field-management/fertilizer-route.js";
import { router as harvestRouter } from "./routes/field-management/harvest-route.js";
import { router as labourRouter } from "./routes/field-management/labour-route.js";
import { router as harvestlogRouter } from "./routes/field-management/harvestlog-route.js";

// Employee Management Routes
import { router as EmployeeManagement } from './routes/employee-management/employee-route.js';
import { router as ApplicantManagement } from './routes/employee-management/applicant-route.js';
import { router as EmployeeProfile } from './routes/employee-management/leave-route.js';
import { router as ApplicantRoles } from './routes/employee-management/roles-route.js';

// Supply Management Routes
import { router as notificationsRouter } from "./routes/repair-management/notification-route.js";
import { router as userLoginRouter } from "./routes/authentication/user-auth-route.js";
import { router as supplierRouter } from "./routes/supply-management/supplier-route.js";
import { router as supplierManagerRouter } from "./routes/supply-management/supplier-manager-route.js";
import { router as supplyRouter } from "./routes/supply-management/supply-route.js";

// create the express app
const app = express();

// basic middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(formData.parse());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Email sending route
app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

// mount routes
app.use("/api/notifications", notificationsRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/auth", authRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/supplierManager", supplierManagerRouter);
app.use("/api/supply", supplyRouter);

// Employee Management
app.use("/api/empManagement", EmployeeManagement);
app.use("/api/applicantManagement", ApplicantManagement);
app.use("/api/employeeProfile", EmployeeProfile);
app.use("/api/applicantRoles", ApplicantRoles);

// Transport Management
app.use("/api/transports", transportRouter);
app.use("/api/routes", routeRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/transportLog", transportLogRouter);
app.use("/api/drivers", driverRouter);

// Repair Management
app.use("/api/assets", assetsRouter);
app.use("/api/maintenances", maintenancesRouter);
app.use("/api/technicians", technicianRouter);
app.use("/api/requestmaintenance", requestMaintenanceRouter);

// Field Management
app.use("/api/fields", fieldRouter);
app.use("/api/fertilizers", fertilizerRouter);
app.use("/api/harvests", harvestRouter);
app.use("/api/labours", labourRouter);
app.use("/api/harvestlogs", harvestlogRouter);

// handle 404 errors
app.use((req, res) => {
  res.status(404).json({ err: "Not found" });
});

// handle all other errors
app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).json({ err: err.message });
});

// export the app
export { app };
