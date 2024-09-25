import { MachineModel } from '../../models/repair-management/machine-model.js';

async function index(req, res) {
  try {
    //get all machines
    const machines = await MachineModel.find({});
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_machine = req.params.id
    const machine = await MachineModel.find({id: req.params.id});
    res.json(machine);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const machine = new MachineModel(req.body);
    await machine.save();
    res.json(machine);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const machine = await MachineModel.findOne({ item_id: req.params.id });
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    Object.assign(machine, req.body);
    await machine.save();
    res.json(machine);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate key error: A machine with this ID already exists' });
    } else {
      res.status(400).json({ error: error });
    }
  }
}

async function destroy(req, res) {
  try {
    const deleteMachine = await MachineModel.find({ item_id: req.params.id })
    if (!deleteMachine) {
        return res.status(404).json({ error: 'Machine not found' });
    };
    await MachineModel.deleteOne({ item_id: deleteMachine[0].item_id });
    res.json({ message: 'Machine deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };