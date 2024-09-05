import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    required: true,
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
  }
});

employeeSchema.post('save', async function(doc) {
  if (doc.designation === 'Labour') {
    // Add additional attributes if needed
    const updatedEmployee = {
      firstName: doc.firstName,
      lastName: doc.lastName,
      id: doc.Id,
      assignedField: "none", // or any other field that makes sense for 'Labour'
      harvest_qnty: 0, // Example value or logic for 'harvest_qnty'
      // Add other necessary fields
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

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee };