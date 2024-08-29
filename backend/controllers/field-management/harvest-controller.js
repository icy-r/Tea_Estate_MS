import { Harvest } from "../../models/field-management/harvest-model.js";

async function index(req, res) {
    try {
        //get all harvests
        const harvests = await Harvest.find({});
        res.json(harvests);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    }

async function show(req, res) {
    try {
        //id_harvest = req.params.id
        const harvest = await Harvest.find({ id: req.params.id });
        res.json(harvest);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const harvest = new Harvest(req.body);
        await harvest.save();
        res.json(harvest);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {

        const harvest = await Harvest.findOne({ id: req.params.id });

        Object.assign(harvest, req.body);
        await harvest.save();
        res.json(harvest);
        } catch (error) {
        res.status(400).json({ error: error });
        }
}

async function destroy(req, res) {
    try {
        const harvest = await Harvest.findOne({ id: req.params.id });
        if (!harvest) {
        return res.status(404).json({ error: 'Harvest not found' });
        }
        await harvest.deleteOne();
        res.json({ message: 'Harvest deleted' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        }
}

export { index, show, create, update, destroy }