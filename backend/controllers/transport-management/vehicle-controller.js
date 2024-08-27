import { Vehicle } from '../../models/transport-management/vehicle-model.js';

async function index(req, res) {
  try {
    //get all vehicles
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_vehicle = req.params.id
    const vehicle = await Vehicle.find({id: req.params.id});
    res.json(vehicle);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const vehicle = await Vehicle.findOne({id: req.params.id});

    Object.assign(vehicle, req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const vehicle = await Vehicle.findOne({ id: req.params.id });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    await vehicle.deleteOne();
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };