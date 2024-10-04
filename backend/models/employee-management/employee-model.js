import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const saltRounds = 6;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  Id: {
    type: String,
    required: true,
    unique: true, // Ensure that Id is unique in the database
  },

  email: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: String,
    required: true,
  },

  contactNumber: {  
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
    enum: ["Employee Manager", "Labour", "Supervisor" , "Technician", "Driver", "Inventory Manager", "Field Manager", "Supply Manager"
      ,"Transport Manager","Product Manager","Sales Manager","Repair Manager"],
  },

  department: {
    type: String,
    required: true,
    enum: ["Repair", "Inventory", "Supply", "Transport", "Product", "Harvest", "Sales", "Field","Employee"],
  },

  dateOfJoining: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  leavesLeft: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

});

// Post-save hook for additional operations for specific designations
employeeSchema.post('save', async function (doc) {
  if (doc.designation === 'Labour' || doc.designation === 'Supervisor') {
    // Add additional attributes if needed for Labour/Supervisor
    const updatedEmployee = {
      firstName: doc.firstName,
      lastName: doc.lastName,
      id: doc.Id,
      role: doc.designation,
      assignedField: "none", // or any other field that makes sense for 'Labour'
      best_qnty: 0,
      good_qnty: 0,
      damaged_qnty: 0,
      harvest_qnty: 0, // Example value or logic for 'harvest_qnty'
      phoneNumber: doc.contactNumber, 
    };

    // Insert into 'Labour' collection
    try {
      const Labour = mongoose.model('Labour');
      await Labour.create(updatedEmployee);
    } catch (err) {
      console.error('Error inserting into Labour collection:', err);
    }
  }
});

// Pre-save hook for hashing password if modified
employeeSchema.pre('save', async function (next) {
  const employee = this;

  if (!employee.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(employee.password, saltRounds);
    employee.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
employeeSchema.methods.comparePassword = async function (tryPassword) {
  return await bcrypt.compare(tryPassword, this.password);
};

// Pre-validate hook to check if Id is already present in the database
employeeSchema.pre('save', async function (next) {
  const employee = this;

  // Check if the Id is unique
  const existingEmployee = await Employee.findOne({ Id: employee.Id });
  if (existingEmployee && existingEmployee._id.toString() !== employee._id.toString()) {
    const error = new Error('Employee with this ID already exists');
    return next(error); // Stop the save operation
  }

  next(); // Proceed if no duplicate is found
});

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee };
