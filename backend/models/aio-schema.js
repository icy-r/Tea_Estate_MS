const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

// Repair and Maintenance Management
const MaintenanceRequestSchema = new Schema({
  requestNumber: { type: String, required: true },
  requestType: {
    type: String,
    enum: ["repair", "maintenance"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed"],
    required: true,
  },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  description: { type: String, required: true },
  requestedBy: {
    employeeId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  assignedTo: {
    technicianId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  asset: {
    assetId: { type: Types.ObjectId, ref: "Asset", required: true },
    assetType: { type: String, enum: ["vehicle", "machinery"], required: true },
    assetName: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date },
});

const AssetSchema = new Schema({
  assetNumber: { type: String, required: true },
  assetType: { type: String, enum: ["vehicle", "machinery"], required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  lastMaintenanceDate: { type: Date },
  nextScheduledMaintenance: { type: Date },
  status: {
    type: String,
    enum: ["operational", "under maintenance", "out of service"],
    required: true,
  },
  location: { type: String, required: true },
  maintenanceHistory: [
    {
      maintenanceId: { type: Types.ObjectId, ref: "MaintenanceRequest" },
      type: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true },
    },
  ],
});

const MaintenanceScheduleSchema = new Schema({
  assetId: { type: Types.ObjectId, ref: "Asset", required: true },
  scheduledDate: { type: Date, required: true },
  maintenanceType: { type: String, required: true },
  description: { type: String, required: true },
  assignedTechnician: {
    technicianId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "postponed"],
    required: true,
  },
  completionDate: { type: Date },
  notes: { type: String },
});

// Employee Management
const EmployeeSchema = new Schema({
  employeeId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
  salary: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  leaveBalance: {
    annual: { type: Number, default: 0 },
    sick: { type: Number, default: 0 },
    personal: { type: Number, default: 0 },
  },
});

const LeaveRequestSchema = new Schema({
  employeeId: { type: Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["annual", "sick", "personal"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
  approvedBy: { type: Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Inventory Management
const InventoryItemSchema = new Schema({
  itemCode: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["raw tea", "processed tea", "utility", "fertilizer"],
    required: true,
  },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  location: { type: String, required: true },
  minimumStockLevel: { type: Number, required: true },
  reorderPoint: { type: Number, required: true },
  lastRestockDate: { type: Date },
  expirationDate: { type: Date },
  supplier: {
    supplierId: { type: Types.ObjectId, ref: "Supplier", required: true },
    name: { type: String, required: true },
  },
  price: { type: Number, required: true },
  description: { type: String },
});

// Supply Management
const SupplierSchema = new Schema({
  supplierCode: { type: String, required: true },
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  suppliedItems: [
    {
      itemId: { type: Types.ObjectId, ref: "InventoryItem" },
      itemName: { type: String, required: true },
    },
  ],
  paymentTerms: { type: String, required: true },
  rating: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

const PurchaseOrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  supplierId: { type: Types.ObjectId, ref: "Supplier", required: true },
  orderDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "shipped", "received", "cancelled"],
    required: true,
  },
  items: [
    {
      itemId: { type: Types.ObjectId, ref: "InventoryItem", required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  approvedBy: { type: Types.ObjectId, ref: "Employee" },
  notes: { type: String },
});

// Field and Harvest Management
const FieldSchema = new Schema({
  fieldNumber: { type: String, required: true },
  area: { type: Number, required: true }, // in hectares
  teaType: { type: String, required: true },
  plantationDate: { type: Date, required: true },
  lastHarvestDate: { type: Date },
  expectedYield: { type: Number, required: true },
  currentStatus: {
    type: String,
    enum: ["growing", "ready for harvest", "under maintenance"],
    required: true,
  },
  assignedEmployees: [{ type: Types.ObjectId, ref: "Employee" }],
  fertilizationSchedule: [
    {
      date: { type: Date, required: true },
      fertilizerType: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const HarvestRecordSchema = new Schema({
  fieldId: { type: Types.ObjectId, ref: "Field", required: true },
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, enum: ["high", "medium", "low"], required: true },
  harvestedBy: [{ type: Types.ObjectId, ref: "Employee" }], // array of employee IDs
  weatherConditions: { type: String, required: true },
  notes: { type: String },
});

// Transport Management
const VehicleSchema = new Schema({
  vehicleNumber: { type: String, required: true },
  type: { type: String, enum: ["truck", "tractor", "van"], required: true },
  capacity: { type: Number, required: true },
  currentDriver: {
    driverId: { type: Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["available", "in use", "under maintenance"],
    required: true,
  },
  lastMaintenanceDate: { type: Date },
  fuelEfficiency: { type: Number, required: true },
  currentLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

const TransportScheduleSchema = new Schema({
  scheduleType: {
    type: String,
    enum: ["delivery", "harvest pickup"],
    required: true,
  },
  vehicleId: { type: Types.ObjectId, ref: "Vehicle", required: true },
  driverId: { type: Types.ObjectId, ref: "Employee", required: true },
  startTime: { type: Date, required: true },
  estimatedEndTime: { type: Date, required: true },
  actualEndTime: { type: Date },
  status: {
    type: String,
    enum: ["scheduled", "in progress", "completed", "cancelled"],
    required: true,
  },
  route: [
    {
      stopType: { type: String, enum: ["pickup", "delivery"], required: true },
      location: { type: String, required: true },
      estimatedArrivalTime: { type: Date, required: true },
      actualArrivalTime: { type: Date },
    },
  ],
  notes: { type: String },
});

// Sales and Order Management
const CustomerSchema = new Schema({
  customerCode: { type: String, required: true },
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  customerType: {
    type: String,
    enum: ["wholesale", "retail", "distributor"],
    required: true,
  },
  creditLimit: { type: Number, required: true },
  paymentTerms: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  customerId: { type: Types.ObjectId, ref: "Customer", required: true },
  orderDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    required: true,
  },
  items: [
    {
      productId: { type: Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "partially paid"],
    required: true,
  },
  shippingMethod: { type: String, required: true },
  trackingNumber: { type: String },
  notes: { type: String },
});

// Product Management
const ProductSchema = new Schema({
  productCode: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  unit: { type: String, required: true },
  minimumStockLevel: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  imageUrl: { type: String },
  tags: [String],
});

const PricingHistorySchema = new Schema({
  productId: { type: Types.ObjectId, ref: "Product", required: true },
  date: { type: Date, required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  reason: { type: String, required: true },
});

// Auction Management
const AuctionSchema = new Schema({
  auctionNumber: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["scheduled", "in progress", "completed", "cancelled"],
    required: true,
  },
  items: [
    {
      productId: { type: Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      startingBid: { type: Number, required: true },
      currentBid: { type: Number, required: true },
      winnerId: { type: Types.ObjectId, ref: "Customer" },
    },
  ],
  participants: [{ type: Types.ObjectId, ref: "Customer" }], // array of customer IDs
  auctioneer: { type: Types.ObjectId, ref: "Employee", required: true }, // employee ID
  notes: { type: String },
});

// Export models
module.exports = {
  MaintenanceRequest: model("MaintenanceRequest", MaintenanceRequestSchema),
  Asset: model("Asset", AssetSchema),
  MaintenanceSchedule: model("MaintenanceSchedule", MaintenanceScheduleSchema),
  Employee: model("Employee", EmployeeSchema),
  LeaveRequest: model("LeaveRequest", LeaveRequestSchema),
  InventoryItem: model("InventoryItem", InventoryItemSchema),
  Supplier: model("Supplier", SupplierSchema),
  PurchaseOrder: model("PurchaseOrder", PurchaseOrderSchema),
  Field: model("Field", FieldSchema),
  HarvestRecord: model("HarvestRecord", HarvestRecordSchema),
  Vehicle: model("Vehicle", VehicleSchema),
  TransportSchedule: model("TransportSchedule", TransportScheduleSchema),
  Customer: model("Customer", CustomerSchema),
  Order: model("Order", OrderSchema),
  Product: model("Product", ProductSchema),
  PricingHistory: model("PricingHistory", PricingHistorySchema),
  Auction: model("Auction", AuctionSchema),
};
