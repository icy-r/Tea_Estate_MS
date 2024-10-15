import { Employee } from '../../models/employee-management/employee-model.js';

async function index(req, res) {
  try {
    //get all employees
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_employee = req.params.id
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const employee = await Employee.findByIdAndUpdate(req.params.id);

    Object.assign(employee, req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.deleteOne();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

async function updateOT(req, res) {
  try {
    const updatedEmployees = req.body;

    for (const emp of updatedEmployees) {
      await Employee.findOneAndUpdate(
        { firstName: emp.name },
        { $inc: { ot: emp.overtimeAllowance } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Overtime updated successfully" });
  } catch (error) {
    console.error("Error updating overtime:", error);
    res.status(500).json({ error: "Failed to update overtime" });
  }
}

export { index, show, create, update, destroy, updateOT };