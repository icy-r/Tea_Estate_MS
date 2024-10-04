import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema
const saltRounds = 6

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
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  department: {
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
  contactNumber: {
    type: String,
    required: true,
  },
});

employeeSchema.post("save", async function (doc) {
  if (doc.designation === "Labour" || doc.designation === "Supervisor") {
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
      harvest_qnty: 0,
      phoneNumber: doc.contactNumber,
    };

    // Insert into 'Labour' collection
    try {
      const Labour = mongoose.model("Labour");
      await Labour.create(updatedEmployee);
    } catch (err) {
      console.error("Error inserting into Labour collection:", err);
    }
  }
});

employeeSchema.pre('save', async function(next) {
    const employee = this;

    if (!employee.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(employee.password, saltRounds);
        employee.password = hash;
        next();
    } catch (err) {
        next(err);
    }
} );

employeeSchema.methods.comparePassword = async function(tryPassword) {
    return await bcrypt.compare(tryPassword, this.password);
}

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee };