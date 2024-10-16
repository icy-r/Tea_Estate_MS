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
//sales-management
import { router as invoicesRouter } from './routes/sales-management/invoices-route.js'
import{router as auctionRouter} from './routes/sales-management/auction-route.js'
import { router as ordersRouter } from './routes/sales-management/orders-route.js'
import { router as salesRouter } from './routes/sales-management/sales-route.js'

// inventory-management
import { router as inventoryRoute } from './routes/inventory-management/inventory-route.js';
import { router as teaInventoryRoute } from './routes/inventory-management/inventory-teaRoute.js';
import { router as fertInventoryRoute } from './routes/inventory-management/inventory-fertRoute.js';
import { router as fuelInventoryRoute } from './routes/inventory-management/inventory-fuelRoute.js';
import { router as utilitiesInventoryRoute } from './routes/inventory-management/inventory-utilitiesRoute.js';
import { reduceFertilizerStock } from './controllers/inventory-management/autoReduction.js';
import { reduceFuelStock } from './controllers/inventory-management/autoReduction.js';


// transport-management
import { router as vehiclesRouter } from './routes/transport-management/vehicle-route.js';
import { router as routeRouter } from './routes/transport-management/route-route.js';
import { router as transportLogRouter } from './routes/transport-management/transport-log-route.js';
import { router as transportRouter } from './routes/transport-management/transport-route.js';
import { router as driverRouter } from './routes/transport-management/driver-route.js';

// user-management
import { router as profilesRouter } from "./routes/user-management/profiles-route.js";
import { router as authRouter } from "./routes/authentication/auth-route.js";
import { router as getEmployeeIdRouter } from "./routes/authentication/get-employee-id-route.js";

// repair-management
import { router as assetsRouter } from "./routes/repair-management/asset-route.js";
import maintenancesRouter from "./routes/repair-management/maintenance-route.js";
import technicianRouter from "./routes/repair-management/technician-route.js";
import requestMaintenanceRouter from "./routes/repair-management/request-maintenance-route.js";


// product-management
import { router as catalogRouter } from "./routes/product-management/catalog-route.js";
import { router as buyersRouter } from "./routes/product-management/buyer-route.js";

// field-management
import { router as fieldRouter } from "./routes/field-management/field-route.js";
import { router as fertilizerRouter } from "./routes/field-management/fertilizer-route.js";
import { router as harvestRouter } from "./routes/field-management/harvest-route.js";
import { router as labourRouter } from "./routes/field-management/labour-route.js";
import { router as harvestlogRouter } from "./routes/field-management/harvestlog-route.js";

// employee-management
import { router as EmployeeManagement } from './routes/employee-management/employee-route.js';
import { router as ApplicantManagement } from './routes/employee-management/applicant-route.js';
import { router as EmployeeProfile } from './routes/employee-management/leave-route.js';
import { router as ApplicantRoles } from './routes/employee-management/roles-route.js';

// supply-management
import { router as notificationsRouter } from "./routes/repair-management/notification-route.js";
import { router as userLoginRouter } from "./routes/authentication/user-auth-route.js";
import { router as orderRouter } from "./routes/supply-management/order-route.js";
import { router as quotationRouter } from "./routes/supply-management/quotation-route.js";
import { router as callingSupplyRoute } from "./routes/supply-management/calling-supply-route.js";
import { router as supplierRouter } from "./routes/supply-management/supplier-route.js";
import { router as supplierManagerRouter } from "./routes/supply-management/supplier-manager-route.js";
import { router as supplyRouter } from "./routes/supply-management/supply-route.js";

import { log } from "console";

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

// inventory-management
app.use("/api/inventory", inventoryRoute);
app.use("/api/tea", teaInventoryRoute);
app.use("/api/fuel", fuelInventoryRoute);
app.use("/api/fert", fertInventoryRoute);
app.use("/api/utilities", utilitiesInventoryRoute);



// employee-management
app.use("/api/empManagement", EmployeeManagement);
app.use("/api/applicantManagement", ApplicantManagement);
app.use("/api/employeeProfile", EmployeeProfile);
app.use("/api/applicantRoles", ApplicantRoles);
app.use("/api/employees", EmployeeManagement);


// supply-management
app.use("/api/supplier", supplierRouter);
app.use("/api/supplierManager", supplierManagerRouter);
app.use("/api/supplies", supplyRouter);
app.use("/api/ordersSup", orderRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/callingSupply", callingSupplyRoute);

// transport-management
app.use("/api/transports", transportRouter);
app.use("/api/routes", routeRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/transportLog", transportLogRouter);
app.use("/api/drivers", driverRouter);

// product-management
app.use("/api/catalog", catalogRouter);
app.use("/api/buyers", buyersRouter);

// repair-management
app.use("/api/technicians", technicianRouter);
app.use("/api/requestMaintenance", requestMaintenanceRouter);
app.use("/api/maintenances", maintenancesRouter);
app.use("/api/assets", assetsRouter);

//sales-management
app.use('/api/invoices', invoicesRouter)
app.use('/api/auction', auctionRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/sales', salesRouter)

//field-management
app.use('/api/fields', fieldRouter)
app.use('/api/fertilizers', fertilizerRouter)
app.use('/api/harvests', harvestRouter)
app.use('/api/labours', labourRouter)


// handle 404 errors
app.use((req, res) => {
  console.log(req);
  res.status(404).json({ err: "Not found" });
});

// handle all other errors
app.use(function (err, req, res, next) {
  console.log(req);
  console.log(err);
  res.status(err.status || 500).json({ err: err.message });
});

export { app };
