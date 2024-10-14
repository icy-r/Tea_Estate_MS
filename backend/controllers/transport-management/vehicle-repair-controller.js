import { VehicleRepair } from '../../models/transport-management/vehicle-repair-model.js';

async function index(req, res) {
    try {
        //get all vehicle repairs
        const vehicleRepairs = await VehicleRepair.find({});
        res.json(vehicleRepairs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function show(req, res) {
    try {
        //id_vehicleRepair = req.params.id
        const vehicleRepair = await VehicleRepair.find({ id: req.params.id });
        res.json(vehicleRepair);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const vehicleRepair = new VehicleRepair(req.body);
        await vehicleRepair.save();
        res.json(vehicleRepair);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {
        const vehicleRepair = await VehicleRepair.findOne({ id: req.params.id });
        Object.assign(vehicleRepair, req.body);
        await vehicleRepair.save();
        res.json(vehicleRepair);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const vehicleRepair = await VehicleRepair.findOne({ id: req.params.id });
        if (!vehicleRepair) {
            return res.status(404).json({ error: 'Vehicle Repair not found' });
        }
        await vehicleRepair.deleteOne();
        res.json({ message: 'Vehicle Repair deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export { index, show, create, update, destroy };
