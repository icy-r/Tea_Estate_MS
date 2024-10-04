// npm packages
import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'
import { Server } from "socket.io";
import { createServer } from "http";
import nodemailer from "nodemailer";

// connect to MongoDB with mongoose
import "./config/database.js";

// import routes
import { router as invoicesRouter } from "./routes/sales-management/invoices-route.js";
//user-management
//transport-management
import { router as vehiclesRouter } from "./routes/transport-management/vehicle-route.js";
import { router as routeRouter } from "./routes/transport-management/route-route.js";
import { router as transportLogRouter } from "./routes/transport-management/transport-log-route.js";
import { router as transportRouter } from "./routes/transport-management/transport-route.js";
//user-management
import { router as profilesRouter } from "./routes/user-management/profiles-route.js";
import { router as authRouter } from "./routes/authentication/auth-route.js";
// //repair-management
// import { router as machinesRouter } from "./routes/repair-management/machines-route.js";
import { router as assetsRouter } from "./routes/repair-management/asset-route.js";
// import { router as maintenancesRouter } from "./routes/repair-management/maintenance-route.js";
// import { router as repairsRouter } from "./routes/repair-management/repair-req-route.js";
import maintenancesRouter from "./routes/repair-management/maintenance-route.js";
import technicianRouter from "./routes/repair-management/technician-route.js";
//product-management
import { router as catalogRouter } from "./routes/product-management/catalog-route.js";
import { router as buyersRouter } from "./routes/product-management/buyer-route.js";
//employee management
import { router as EmployeeManagement } from "./routes/employee-management/employee-route.js";
import { router as ApplicantManagement } from "./routes/employee-management/applicant-route.js";
//field-management
import { router as fieldRouter } from "./routes/field-management/field-route.js";
import { router as fertilizerRouter } from "./routes/field-management/fertilizer-route.js";
import { router as harvestRouter } from "./routes/field-management/harvest-route.js";
import { router as labourRouter } from "./routes/field-management/labour-route.js";
import { router as orderTrackingRouter } from "./routes/product-management/order-tracking-route.js";

//supply management
import { router as supplierRouter } from "./routes/supply-management/supplier-route.js";
import { router as supplierManagerRouter } from "./routes/supply-management/supplier-manager-route.js";
import { router as supplyRouter } from "./routes/supply-management/supply-route.js";

// create the express app
const app = express();

// create the socket.io server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// listen for socket.io connections
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "hennahnime@gmail.com",
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

// mount imported routes
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
// app.use('/api/machines', machinesRouter)

app.use('/api/empManagement' , EmployeeManagement)
app.use('/api/applicantManagement' , ApplicantManagement)

app.use('/api/invoices', invoicesRouter)
app.use('/api/supplier', supplierRouter)
app.use('/api/supplierManager', supplierManagerRouter)
app.use('/api/supply', supplyRouter)




//transport-management
app.use('/api/transports', transportRouter)
app.use('/api/routes', routeRouter)
app.use('/api/vehicles', vehiclesRouter)
app.use('/api/catalog', catalogRouter)
app.use('/api/buyers', buyersRouter)
app.use('/api/transportLog', transportLogRouter)

// //repair-management
// app.use('/api/machines', machinesRouter)
app.use('/api/assets', assetsRouter)
app.use('/api/maintenances', maintenancesRouter)
app.use('/api/technicians', technicianRouter)
// app.use("/api/repairs", repairsRouter);

//field-management
app.use('/api/fields', fieldRouter);
app.use('/api/fertilizers', fertilizerRouter);
app.use('/api/harvests', harvestRouter);
app.use('/api/labours', labourRouter);

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
