import { Leave } from '../../models/employee-management/leave-model.js';

async function index(req, res) {
  try {
    //get all leaves
    const leaves = await Leave.find({});
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_leave = req.params.id
    const leave = await Leave.findById(req.params.id);
    res.json(leave);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const leave = await Leave.findByIdAndUpdate(req.params.id);

    Object.assign(leave, req.body);
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ error: 'Leave not found' });
    }
    await leave.deleteOne();
    res.json({ message: 'Leave deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };