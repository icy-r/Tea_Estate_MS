// npm packages
import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'

// connect to MongoDB with mongoose
import './config/database.js'

// import routes
//sales-management
import { router as invoicesRouter } from './routes/sales-management/invoices-route.js'
import{router as auctionRouter} from './routes/sales-management/auction-route.js'
import { router as ordersRouter } from './routes/sales-management/orders-route.js'
import { router as salesRouter } from './routes/sales-management/sales-route.js'

//transport-management
import { router as vehiclesRouter } from './routes/transport-management/vehicle-route.js'
import { router as routeRouter } from './routes/transport-management/route-route.js'
import { router as transportRouter } from './routes/transport-management/transport-route.js'
//user-management
import { router as profilesRouter } from './routes/user-management/profiles-route.js'
import { router as authRouter } from './routes/authentication/auth-route.js'
//repair-management
import { router as machinesRouter } from './routes/repair-management/machines-route.js'
import { router as logsRouter } from './routes/repair-management/log-route.js'
import { router as maintenancesRouter } from './routes/repair-management/maintenance-route.js'
import { router as repairsRouter } from './routes/repair-management/repair-req-route.js'
//product-management
import { router as catalogRouter } from './routes/product-management/catalog-route.js'
import { router as buyersRouter } from './routes/product-management/buyer-route.js'
//employee management
import { router as EmployeeManagement } from './routes/employee-management/employee-route.js'
import { router as ApplicantManagement } from './routes/employee-management/applicant-route.js'
//field-management
import { router as fieldRouter } from './routes/field-management/field-route.js';
import { router as fertilizerRouter } from './routes/field-management/fertilizer-route.js';
import { router as harvestRouter } from './routes/field-management/harvest-route.js';
import { router as labourRouter } from './routes/field-management/labour-route.js';
import { router as orderTrackingRouter } from './routes/product-management/order-tracking-route.js'

//supplier-management
import { router as supplierRouter } from './routes/supply-management/supplier-route.js'
import { router as supplierManagerRouter } from './routes/supply-management/supplier-manager-route.js'
import { router as supplyRouter } from './routes/supply-management/supply-route.js'




// create the express app
const app = express()

// basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// mount imported routes
//user-management
//user-management
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/machines', machinesRouter)

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

//repair-management
app.use('/api/machines', machinesRouter)
app.use('/api/logs', logsRouter)
app.use('/api/maintenances', maintenancesRouter)
app.use('/api/repairs', repairsRouter)
app.use('/api/logs', logsRouter)
app.use('/api/maintenances', maintenancesRouter)
app.use('/api/repairs', repairsRouter)

//sales-management
app.use('/api/invoices', invoicesRouter)
app.use('/api/auction', auctionRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/sales', salesRouter)

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
