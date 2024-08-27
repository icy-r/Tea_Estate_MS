import { Machine } from '../../models/repair-management/machine-model.js';

async function index(req, res) {
  try {
    //get all machines
    const machines = await Machine.find({});
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_machine = req.params.id
    const machine = await Machine.find({id: req.params.id});
    res.json(machine);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const machine = new Machine(req.body);
    await machine.save();
    res.json(machine);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const machine = await Machine.findOne({id: req.params.id});

    Object.assign(machine, req.body);
    await machine.save();
    res.json(machine);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const machine = await Machine.findOne({ id: req.params.id });
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    await machine.deleteOne();
    res.json({ message: 'Machine deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };