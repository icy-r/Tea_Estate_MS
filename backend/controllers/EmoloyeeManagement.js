import { Employee } from '../models/Employeemanagement.js';

// display
const getAllEmployees = async (req, res, next) => {

  let Employees;

  try{
    Employees = await Employee.find();
  }catch (err) {
    console.log(err);
  }

  if (!Employees){
    return res.status(404).json({message:"Employee not found"})
  }

  return res.status(200).json({Employees});

};

// data insert 
const addEmployees = async(req, res, next) => {

    const {firstName,lastName,Idd,email,designation,address,age,dateOfBirth,dateOfJoining,department,salary} = req.body;

    let employees;
    
    try {
      employees = new Employee({firstName,lastName,id,email,designation,address,age,dateOfBirth,dateOfJoining,department,salary});
      await employees.save();
    }catch (err) {
      console.log(err);
    }
    if (!employees){
      return res.status(404).json({message:"Employee not added"})
    }
    return res.status(200).json({ employees });
}

// get by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  let employee;

  try{
    employee = await Employee.findById(id);
  }catch (err){
    console.log(err);
  }
  if (!employees){
    return res.status(404).json({message:"Employee not found"})
  }
  return res.status(200).json({ employees });
}

// Update Employee
const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const {firstName,lastName,Id,email,designation,address,age,dateOfBirth,dateOfJoining,department,salary} = req.body;

  let employees;

  try {
    employees = await Employee.findByIdAndUpdate(id,
      {firstName: firstName ,lastName: lastName,Id: Id,email: email,designation: designation,address: address,age: age,dateOfBirth: dateOfBirth,dateOfJoining: dateOfJoining,department: department,salary: salary})
  }catch(err){
    console.log(err);
  }  
  if (!employees){
    return res.status(404).json({message:"Employee not found"})
  }
  return res.status(200).json({ employees });



}

//Delete user details
const deleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  let employee;

  try{
    employee = await Employee.findByIdAndDelete(id);
  }catch (err){
    console.log(err);
  }
  if (!employees){
    return res.status(404).json({message:"Employee not found"})
  }
  return res.status(200).json({ employees });
}

export { getAllEmployees, addEmployees, getById, updateEmployee, deleteEmployee };

